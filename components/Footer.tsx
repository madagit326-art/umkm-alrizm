export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo Alrizm, saya ingin memesan produk dari toko Anda.")}`;

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <h3>ORDER NOW</h3>
        <p>
          Pesan sekarang dan dapatkan penawaran khusus untuk koleksi eksklusif kami.
        </p>
        <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
          ORDER &amp; PAY
        </a>
      </div>

      <div className="footer-bottom">
        <p>© 2026 UMKM Alrizm — All rights reserved.</p>
        <p>Crafted with ❤️ for sustainable fashion lovers</p>
      </div>
    </footer>
  );
}
