import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Alrizm, saya ingin berkonsultasi mengenai produk perhiasan handmade Anda."
  )}`;

  return (
    <footer className="belora-footer">
      <div className="belora-footer-container">
        {/* Col 1: Brand & Tagline */}
        <div className="footer-col footer-col--brand">
          <Link href="/" className="footer-logo-link">
            <Image
              src="/uploads/logo.png"
              alt="ALRIZM"
              width={140}
              height={40}
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-brand-tagline">
            Natural beauty, conscious craft. Menghadirkan perhiasan makrame &amp; batu alam nusantara berkualitas tinggi.
          </p>
          <div className="footer-social-links" aria-label="Media Sosial">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" title="WhatsApp" className="social-icon-btn">
              💬
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="social-icon-btn">
              📷
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok" className="social-icon-btn">
              🎵
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="social-icon-btn">
              📘
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">QUICK LINKS</h4>
          <ul className="footer-links-list">
            <li><Link href="/">Home</Link></li>
            <li><a href="/#products">Shop Katalog</a></li>
            <li><Link href="/collection/Bracelet">Gelang (Bracelet)</Link></li>
            <li><Link href="/collection/Necklace">Kalung (Necklace)</Link></li>
            <li><Link href="/collection/Ring">Cincin (Ring)</Link></li>
            <li><a href="/#story">About Us</a></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="footer-col">
          <h4 className="footer-col-title">CUSTOMER CARE</h4>
          <ul className="footer-links-list">
            <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Cara Pemesanan</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Panduan Ukuran Tangan</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Perawatan Batu Alam</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Kebijakan Garansi</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noreferrer">FAQ &amp; Bantuan</a></li>
          </ul>
        </div>

        {/* Col 4: Contact Us */}
        <div className="footer-col">
          <h4 className="footer-col-title">CONTACT US</h4>
          <div className="footer-contact-info">
            <p className="contact-line">
              <strong>📞 WhatsApp:</strong>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                +62 889-8740-5531
              </a>
            </p>
            <p className="contact-line">
              <strong>✉️ Email:</strong>
              <span>alrizmhandmade@gmail.com</span>
            </p>
            <p className="contact-line">
              <strong>📍 Lokasi Pengrajin:</strong>
              <span>Indonesia — Pengiriman Aman Seluruh Nusantara</span>
            </p>
          </div>
        </div>

        {/* Col 5: Newsletter / Konsultasi */}
        <div className="footer-col footer-col--newsletter">
          <h4 className="footer-col-title">KONSULTASI &amp; PROMO</h4>
          <p className="newsletter-desc">
            Dapatkan katalog model terbaru, info promo khusus, dan tips merawat perhiasan batu alam.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open(whatsappUrl, "_blank");
            }}
            className="newsletter-form"
          >
            <input
              type="text"
              placeholder="Nomor WhatsApp Anda..."
              aria-label="Nomor WhatsApp"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-submit-btn">
              KONSULTASI VIA WA
            </button>
          </form>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <p>© {new Date().getFullYear()} UMKM Alrizm. All Rights Reserved. Crafted with care &amp; sustainable style.</p>
      </div>
    </footer>
  );
}
