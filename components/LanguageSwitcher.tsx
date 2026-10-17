"use client";

import { useState, useEffect, useRef } from "react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "id", name: "Indonesia", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", name: "Chinese", nativeName: "简体中文", flag: "🇨🇳" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("id");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read current language from Google Translate cookie on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    };

    const googtrans = getCookie("googtrans");
    if (googtrans) {
      const parts = googtrans.split("/");
      const targetLang = parts[parts.length - 1];
      if (targetLang) {
        setCurrentLang(targetLang);
      }
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set Google Translate cookie format: /id/targetLang
    const cookieValue = `/id/${langCode}`;
    const domain = window.location.hostname;

    document.cookie = `googtrans=${cookieValue}; path=/;`;
    if (domain !== "localhost") {
      document.cookie = `googtrans=${cookieValue}; domain=.${domain}; path=/;`;
    }

    // Attempt to trigger Google Translate dropdown change event directly
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const currentObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="language-switcher-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Ganti Bahasa / Switch Language"
      >
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lang-icon-svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="lang-flag">{currentObj.flag}</span>
        <span className="lang-code">{currentObj.code.toUpperCase()}</span>
        <svg
          viewBox="0 0 24 24"
          width="9"
          height="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`lang-chevron ${isOpen ? "open" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown-menu" role="listbox">
          <div className="dropdown-header">
            <span>Pilih Bahasa / Language</span>
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`language-option-item ${currentLang === lang.code ? "active" : ""}`}
              onClick={() => handleSelectLanguage(lang.code)}
              role="option"
              aria-selected={currentLang === lang.code}
            >
              <span className="opt-flag">{lang.flag}</span>
              <div className="opt-names">
                <span className="opt-native">{lang.nativeName}</span>
                <span className="opt-eng">({lang.name})</span>
              </div>
              {currentLang === lang.code && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="opt-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

