import Image from "next/image";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav className="nav-left">
          <a href="/">Home</a>
          <a href="#about">About Us</a>
          <a href="#products">New Arrivals</a>
        </nav>

        <div className="brand">
          <Image src="/uploads/logo.png" alt="Alrimz" width={160} height={48} className="brand-logo" />
        </div>

        <div className="nav-right">
          <a href="#products" className="icon-search" aria-label="Search">🔍</a>
        </div>
      </div>
    </header>
  );
}
