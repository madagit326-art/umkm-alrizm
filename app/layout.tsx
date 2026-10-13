import "./globals.css";
import type { Metadata, Viewport } from "next";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "UMKM Alrizm — Perhiasan Handmade & Sustainable Style",
  description: "Toko online resmi UMKM Alrizm. Menghadirkan gelang makrame batu alam, kalung etnik, dan kerajinan tangan berkualitas tinggi asli Indonesia.",
  keywords: ["umkm", "kerajinan", "perhiasan", "alrizm", "gelang makrame", "batu alam", "toko online", "handmade jewelry"],
  authors: [{ name: "UMKM Alrizm" }],
  openGraph: {
    title: "UMKM Alrizm — Perhiasan Handmade & Sustainable Style",
    description: "Koleksi perhiasan artisanal dan batu alam karya pengrajin lokal berkualitas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b1b3f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
