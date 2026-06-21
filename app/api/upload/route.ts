import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const maxFileSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "File gambar diperlukan." },
        { status: 400 }
      );
    }

    if (!allowedMimeTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung." },
        { status: 400 }
      );
    }

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Konfigurasi Supabase belum lengkap. Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      );
    }

    const fileName =
      Date.now() +
      "-" +
      file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    return NextResponse.json({
      url: data.publicUrl,
    });
  } catch (err: any) {
    console.error("Upload error:", err);

    return NextResponse.json(
      {
        error: err.message || "Upload gagal",
      },
      { status: 500 }
    );
  }
}