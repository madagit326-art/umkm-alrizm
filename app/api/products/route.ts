import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Product } from "@/lib/types";

function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    if (id) {
      const rows = await query("SELECT * FROM products WHERE id = ?", [Number(id)]);
      const product = Array.isArray(rows) ? rows[0] : null;
      return NextResponse.json(product ?? null, { status: product ? 200 : 404 });
    }

    if (category) {
      const rows = await query(
        "SELECT * FROM products WHERE LOWER(category) = LOWER(?) ORDER BY id DESC",
        [category]
      );
      return NextResponse.json(rows);
    }

    const rows = await query("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return errorResponse("Gagal memuat produk.");
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Product;

    if (!body.name || !body.category || body.price == null) {
      return errorResponse("Nama, kategori, dan harga produk wajib diisi.", 400);
    }

    const result = await query(
      "INSERT INTO products (name, category, price, description, image, image2, image3, image4, image5, image6, highlight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [body.name, body.category, body.price, body.description, body.image, body.image2 || "", body.image3 || "", body.image4 || "", body.image5 || "", body.image6 || "", body.highlight]
    );

    return NextResponse.json({ message: "Produk berhasil ditambahkan.", id: (result as any).insertId });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return errorResponse("Gagal menyimpan produk.");
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Product;
    if (!body.id) {
      return errorResponse("ID produk diperlukan.", 400);
    }

    await query(
      "UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, image6 = ?, highlight = ? WHERE id = ?",
      [body.name, body.category, body.price, body.description, body.image, body.image2 || "", body.image3 || "", body.image4 || "", body.image5 || "", body.image6 || "", body.highlight, body.id]
    );

    return NextResponse.json({ message: "Produk berhasil diperbarui." });
  } catch (err) {
    console.error("PUT /api/products error:", err);
    return errorResponse("Gagal memperbarui produk.");
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return errorResponse("ID produk diperlukan.", 400);
    }

    await query("DELETE FROM products WHERE id = ?", [Number(id)]);
    return NextResponse.json({ message: "Produk berhasil dihapus." });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return errorResponse("Gagal menghapus produk.");
  }
}
