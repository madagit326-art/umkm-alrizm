import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { Product } from "@/lib/types";

function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeProduct(product: Partial<Product> | null): Product | null {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name ?? "",
    category: product.category ?? "",
    price: Number(product.price ?? 0),
    description: product.description ?? "",
    image: product.image ?? "",
    image2: product.image2 ?? "",
    image3: product.image3 ?? "",
    image4: product.image4 ?? "",
    image5: product.image5 ?? "",
    image6: product.image6 ?? "",
    highlight: product.highlight ?? "",
  };
}

let fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Macrame Bracelet Tiger Eyes Stone",
    category: "Bracelet",
    price: 150000,
    description: "Gelangan tangan makrame dengan batu tiger eyes, cocok untuk gaya boho.",
    image: "/placeholder.svg",
    highlight: "Best Seller",
  },
  {
    id: 2,
    name: "Handcrafted Necklace",
    category: "Necklace",
    price: 175000,
    description: "Kalung handmade dengan desain minimalis, ideal untuk sehari-hari.",
    image: "/placeholder.svg",
    highlight: "Populer",
  },
  {
    id: 3,
    name: "Beaded Bracelet - Ocean",
    category: "Bracelet",
    price: 95000,
    description: "Gelang manik-manik tema laut.",
    image: "/placeholder.svg",
    highlight: "Featured",
  },
  {
    id: 4,
    name: "Silver Minimal Necklace",
    category: "Necklace",
    price: 125000,
    description: "Kalung silver sederhana untuk daily wear.",
    image: "/placeholder.svg",
  },
];

function toProducts(rows: unknown): Product[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => normalizeProduct(row as Partial<Product> | null))
    .filter((product): product is Product => Boolean(product));
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    if (id) {
      const rows = await query<Partial<Product>>(
        "SELECT * FROM products WHERE id = ?",
        [Number(id)]
      );
      const product = toProducts(rows)[0] ?? null;
      if (product) {
        return NextResponse.json(product, { status: 200 });
      }
      return NextResponse.json(
        fallbackProducts.find((item) => item.id === Number(id)) ?? null,
        { status: 200 }
      );
    }

    if (category) {
      const rows = await query<Partial<Product>>(
        "SELECT * FROM products WHERE LOWER(category) = LOWER(?) ORDER BY id DESC",
        [category]
      );
      const products = toProducts(rows);
      return NextResponse.json(
        products.length > 0 ? products : fallbackProducts.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        ),
        { status: 200 }
      );
    }

    const rows = await query<Partial<Product>>("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json(toProducts(rows).length > 0 ? toProducts(rows) : fallbackProducts, {
      status: 200,
    });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal memuat produk." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Product;
    const trimmedName = body.name?.trim() || "";
    const trimmedCategory = body.category?.trim() || "";
    const trimmedDescription = body.description?.trim() || "";
    const price = Number(body.price);

    if (!trimmedName || !trimmedCategory || !Number.isFinite(price) || price <= 0) {
      return errorResponse("Nama, kategori, dan harga produk wajib diisi.", 400);
    }

    try {
      const result = await query<{ id: number }>(
        "INSERT INTO products (name, category, price, description, image, image2, image3, image4, image5, image6, highlight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
        [
          trimmedName,
          trimmedCategory,
          price,
          trimmedDescription,
          body.image || "",
          body.image2 || "",
          body.image3 || "",
          body.image4 || "",
          body.image5 || "",
          body.image6 || "",
          body.highlight || "",
        ]
      );

      const insertId = result[0]?.id ?? null;
      return NextResponse.json({
        message: "Produk berhasil ditambahkan.",
        id: insertId,
      });
    } catch (dbError: any) {
  console.error("POST /api/products DB error:", {
    message: dbError?.message,
    detail: dbError?.detail,
    code: dbError?.code,
    hint: dbError?.hint,
  });

  return NextResponse.json(
    {
      error: dbError?.message,
      detail: dbError?.detail,
      code: dbError?.code,
    },
    { status: 500 }
  );
}
  } catch (err) {
    console.error("POST /api/products error:", err);
    return errorResponse("Gagal menyimpan produk.");
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Product;
    const productId = Number(body.id);
    const trimmedName = body.name?.trim() || "";
    const trimmedCategory = body.category?.trim() || "";
    const trimmedDescription = body.description?.trim() || "";
    const price = Number(body.price);

    if (!Number.isFinite(productId) || productId <= 0) {
      return errorResponse("ID produk diperlukan.", 400);
    }

    if (!trimmedName || !trimmedCategory || !Number.isFinite(price) || price <= 0) {
      return errorResponse("Nama, kategori, dan harga produk wajib diisi.", 400);
    }

    try {
      await query(
        "UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, image6 = ?, highlight = ? WHERE id = ?",
        [
          trimmedName,
          trimmedCategory,
          price,
          trimmedDescription,
          body.image || "",
          body.image2 || "",
          body.image3 || "",
          body.image4 || "",
          body.image5 || "",
          body.image6 || "",
          body.highlight || "",
          productId,
        ]
      );
    } catch (dbError: any) {
  console.error("POST /api/products DB error:", {
    message: dbError?.message,
    detail: dbError?.detail,
    code: dbError?.code,
    hint: dbError?.hint,
  });

  return NextResponse.json(
    {
      error: dbError?.message,
      detail: dbError?.detail,
      code: dbError?.code,
    },
    { status: 500 }
  );
}

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
    const productId = Number(id);
    if (!Number.isFinite(productId) || productId <= 0) {
      return errorResponse("ID produk diperlukan.", 400);
    }

    try {
      await query("DELETE FROM products WHERE id = ?", [productId]);
    } catch (dbError: any) {
  console.error("POST /api/products DB error:", {
    message: dbError?.message,
    detail: dbError?.detail,
    code: dbError?.code,
    hint: dbError?.hint,
  });

  return NextResponse.json(
    {
      error: dbError?.message,
      detail: dbError?.detail,
      code: dbError?.code,
    },
    { status: 500 }
  );
}

    return NextResponse.json({ message: "Produk berhasil dihapus." });
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return errorResponse("Gagal menghapus produk.");
  }
}
