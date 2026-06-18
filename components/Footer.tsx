export default function Footer() {
  return (
    <footer style={{ marginTop: "3rem" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #e6f0ff 0%, #eef6ff 100%)", 
        padding: "3rem 2rem", 
        borderRadius: "1.5rem",
        textAlign: "center",
        margin: "2rem"
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: "1.8rem",
          color: "#0a1f47",
          fontWeight: "700"
        }}>ORDER NOW</h3>
        <p style={{ 
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
          color: "#64748b",
          fontSize: "1rem"
        }}>Pesan sekarang dan dapatkan penawaran khusus untuk koleksi eksklusif kami.</p>
        <a className="button primary" href="#" style={{
          display: "inline-block"
        }}>ORDER & PAY</a>
      </div>

      <div style={{ 
        marginTop: "2rem", 
        textAlign: "center", 
        color: "#64748b",
        padding: "2rem",
        borderTop: "1px solid #e2e8f0"
      }}>
        <p style={{ margin: "0.5rem 0" }}>© 2026 UMKM Alrizm — All rights reserved.</p>
        <p style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>Crafted with ❤️ for sustainable fashion lovers</p>
      </div>
    </footer>
  );
}
