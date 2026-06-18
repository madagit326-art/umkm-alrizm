import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM Alrizm",
  description: "Toko online kerajinan yang dapat dikelola oleh admin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
