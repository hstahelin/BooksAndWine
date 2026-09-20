import { getDb } from "@/db";
import { subscribers } from "@/db/schema";

const MAX_BODY_BYTES = 2_048;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: { message?: string; error?: string }, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "That request is too large." }, 413);
  }

  let payload: { email?: unknown; company?: unknown };

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ error: "That request is too large." }, 413);
    }
    payload = JSON.parse(body) as { email?: unknown; company?: unknown };
  } catch {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  if (typeof payload.company === "string" && payload.company.trim()) {
    return json({ message: "You’re on the list." });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  try {
    const db = getDb();
    await db
      .insert(subscribers)
      .values({ email, source: "coming-soon" })
      .onConflictDoNothing({ target: subscribers.email });

    return json({ message: "You’re on the list. We’ll be in touch." });
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "subscriber signup failed",
        error: error instanceof Error ? error.message : String(error),
      })
    );
    return json({ error: "We couldn’t save your email. Please try again shortly." }, 503);
  }
}
