"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-left" aria-label="Primary navigation">
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

      <div id="mobile-menu-panel" className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
        <a href="#products" onClick={() => setMenuOpen(false)}>New Arrivals</a>
      </div>
    </header>
  );
}
