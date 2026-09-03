import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export async function getUserByEmail(
  email: string,
): Promise<User | null> {
  const rows = await sql`
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return rows.length > 0
    ? (rows[0] as User)
    : null;
}