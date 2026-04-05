import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "W4U — Work For You",
  description:
    "South Africa's trusted peer-to-peer platform for the informal economy. Find verified workers, get paid instantly, build your reputation.",
};

export const viewport: Viewport = {
  themeColor: "#1B7A3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
