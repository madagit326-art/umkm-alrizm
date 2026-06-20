import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "UMKM Alrizm",
  description: "Toko online kerajinan yang dapat dikelola oleh admin.",
  keywords: ["umkm", "kerajinan", "perhiasan", "alrizm", "toko online"],
  authors: [{ name: "UMKM Alrizm" }],
  openGraph: {
    title: "UMKM Alrizm",
    description: "Toko online kerajinan yang dapat dikelola oleh admin.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1f47",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
