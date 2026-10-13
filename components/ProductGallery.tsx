"use client";

import { useState } from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export default function ProductGallery({ name, images }: ProductGalleryProps) {
  const validImages = images.filter((img) => Boolean(img && img.trim() !== ""));
  const fallbackImage = validImages[0] || "/placeholder.svg";
  const [selectedImage, setSelectedImage] = useState(fallbackImage);

  return (
    <div className="detail-images">
      <div className="detail-main-image">
        <img src={selectedImage} alt={name} />
      </div>

      {validImages.length > 1 && (
        <div className="detail-thumb-row" role="tablist" aria-label="Galeri Foto Produk">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`detail-thumb-btn ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
              aria-label={`Lihat gambar produk ${idx + 1}`}
            >
              <img src={img} alt={`${name} ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

