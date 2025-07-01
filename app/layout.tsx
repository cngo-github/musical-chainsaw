import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, Vote, and Grow with YC Directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-work-sans">{children}</body>
    </html>
  );
}
