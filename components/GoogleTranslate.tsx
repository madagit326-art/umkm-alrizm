"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "id",
            includedLanguages: "id,en,ja,zh-CN,fr,de,ru",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}

