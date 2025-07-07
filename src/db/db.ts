import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle(process.env.TURSO_DATABASE_URL!);
