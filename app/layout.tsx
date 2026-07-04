import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "manda - Sell your business",
  description: "Digital onboarding for selling your business on the manda platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
