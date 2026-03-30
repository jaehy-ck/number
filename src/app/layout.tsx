import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Number Drawing App",
  description: "A premium number drawing and Omikuji experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
