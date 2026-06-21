import { Pool } from "pg";
const env = process.env;
const connectionString = env.DATABASE_URL || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL;

function isEnabled(value?: string) {
  return value?.toLowerCase() === "true" || value === "1";
}

function getPool() {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL belum diatur. Isi connection string Supabase di file .env.local atau variabel environment."
    );
  }

  if (connectionString.includes("[YOUR-PASSWORD]") || connectionString.includes("[PROJECT-REF]")) {
    throw new Error(
      "DATABASE_URL masih memakai placeholder dari contoh. Ganti dengan connection string asli dari Supabase sebelum menjalankan aplikasi."
    );
  }
  
  try {
  new URL(connectionString);
} catch {
  throw new Error(
    "DATABASE_URL tidak valid. Gunakan format postgres://user:password@host:5432/database"
  );
}

  return new Pool({
    connectionString,
    ssl:
      isEnabled(env.DB_SSL) || process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });
}

function toPostgresSql(sql: string, values: unknown[] = []) {
  let index = 0;
  const text = sql.replace(/\?/g, () => `$${++index}`);
  return { text, values };
}

let pool: Pool | null = null;

export async function query<T = unknown>(sql: string, values: unknown[] = []): Promise<T[]> {
  if (!pool) {
    pool = getPool();
  }

  const { text, values: params } = toPostgresSql(sql, values);
  const result = await pool.query(text, params);
  return result.rows as T[];
}
