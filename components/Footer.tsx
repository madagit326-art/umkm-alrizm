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
              alt="Alrizm Handmade Of Bali"
              width={140}
              height={40}
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-brand-tagline">
            Natural beauty, conscious craft. Menghadirkan perhiasan makrame &amp; batu alam nusantara berkualitas tinggi.
          </p>
          <div className="footer-social-links" aria-label="Media Sosial">
            {/* WhatsApp */}
            <a href={whatsappUrl} target="_blank" rel="noreferrer" title="WhatsApp" className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="social-icon-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
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
            <div className="contact-line">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-inline">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <strong>WhatsApp:</strong>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  +62 889-8740-5531
                </a>
              </div>
            </div>

            <div className="contact-line">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-inline">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <div>
                <strong>Email:</strong>
                <span>alrizmhandmade@gmail.com</span>
              </div>
            </div>

            <div className="contact-line">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-inline">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <strong>Pengrajin:</strong>
                <span>Indonesia — Pengiriman Aman Seluruh Nusantara</span>
              </div>
            </div>
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
