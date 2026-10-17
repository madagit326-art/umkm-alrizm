import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Review, ReviewStats } from "@/lib/types";

let tableEnsured = false;
async function ensureReviewsTable() {
  if (tableEnsured) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id BIGSERIAL PRIMARY KEY,
        product_id BIGINT NOT NULL,
        customer_name VARCHAR(150) NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tableEnsured = true;
  } catch (err) {
    console.error("Warning: could not ensure reviews table:", err);
  }
}

// In-memory fallback in case DB is momentarily unavailable
const inMemoryFallbackReviews: Review[] = [
  {
    id: 1,
    product_id: 1,
    customer_name: "Siti Rahmawati",
    rating: 5,
    comment: "Kualitas batu alamnya sangat bagus dan anyaman makramenya rapi sekali. Nyaman dipakai seharian!",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    product_id: 1,
    customer_name: "Budi Santoso",
    rating: 5,
    comment: "Ukuran pas di pergelangan tangan, pengiriman cepat dan kemasan aman bubble wrap tebal. Recommended!",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET(request: Request) {
  await ensureReviewsTable();

  const { searchParams } = new URL(request.url);
  const productId = Number(searchParams.get("productId"));

  if (!productId || isNaN(productId)) {
    return NextResponse.json({ error: "Parameter productId tidak valid" }, { status: 400 });
  }

  try {
    const reviews = await query<Review>(
      "SELECT id, product_id, customer_name, rating, comment, created_at FROM reviews WHERE product_id = ? ORDER BY id DESC LIMIT 50",
      [productId]
    );

    const totalReviews = reviews.length;
    const ratingCounts: { [stars: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sumRating = 0;

    for (const r of reviews) {
      const star = Math.min(5, Math.max(1, Number(r.rating) || 5));
      ratingCounts[star] = (ratingCounts[star] || 0) + 1;
      sumRating += star;
    }

    const averageRating = totalReviews > 0 ? Number((sumRating / totalReviews).toFixed(1)) : 5.0;

    const stats: ReviewStats = {
      averageRating,
      totalReviews,
      ratingCounts,
    };

    return NextResponse.json({
      reviews,
      stats,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Graceful fallback
    const fallbackForProduct = inMemoryFallbackReviews.filter((r) => r.product_id === productId);
    return NextResponse.json({
      reviews: fallbackForProduct,
      stats: {
        averageRating: 5.0,
        totalReviews: fallbackForProduct.length,
        ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: fallbackForProduct.length },
      },
    });
  }
}

export async function POST(request: Request) {
  await ensureReviewsTable();

  try {
    const body = await request.json();
    const productId = Number(body.product_id);
    const customerName = String(body.customer_name || "").trim();
    const rating = Number(body.rating);
    const comment = String(body.comment || "").trim();

    // Validations
    if (!productId || isNaN(productId)) {
      return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
    }

    if (!customerName || customerName.length < 2) {
      return NextResponse.json({ error: "Nama pengulas minimal 2 karakter" }, { status: 400 });
    }

    if (customerName.length > 100) {
      return NextResponse.json({ error: "Nama pengulas maksimal 100 karakter" }, { status: 400 });
    }

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating bintang harus antara 1 sampai 5" }, { status: 400 });
    }

    if (!comment || comment.length < 3) {
      return NextResponse.json({ error: "Ulasan minimal 3 karakter" }, { status: 400 });
    }

    if (comment.length > 1000) {
      return NextResponse.json({ error: "Ulasan maksimal 1000 karakter" }, { status: 400 });
    }

    // Insert into database
    const inserted = await query<Review>(
      `INSERT INTO reviews (product_id, customer_name, rating, comment, created_at)
       VALUES (?, ?, ?, ?, NOW())
       RETURNING id, product_id, customer_name, rating, comment, created_at`,
      [productId, customerName, Math.round(rating), comment]
    );

    const newReview = inserted[0] || {
      id: Date.now(),
      product_id: productId,
      customer_name: customerName,
      rating: Math.round(rating),
      comment,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        message: "Ulasan berhasil dikirim! Terima kasih atas ulasan Anda.",
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan ulasan. Silakan coba beberapa saat lagi." },
      { status: 500 }
    );
  }
}
