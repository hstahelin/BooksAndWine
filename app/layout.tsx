import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books & Wine — Book & Wine Pairings",
  description:
    "A new journal for thoughtful reads, memorable bottles, and the conversations that connect them.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
