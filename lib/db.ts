import mysql from "mysql2/promise";

const {
  MYSQL_HOST = "127.0.0.1",
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "",
  MYSQL_DATABASE = "umkm_alrizm",
} = process.env;

const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export async function query(sql: string, values: any[] = []) {
  const [rows] = await pool.query(sql, values);
  return rows;
}
