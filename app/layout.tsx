import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books & Wine — A journal for considered evenings",
  description:
    "Stories worth staying up for, paired with bottles that make the conversation last a little longer.",
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
