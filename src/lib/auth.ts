import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db"; // your drizzle instance
import * as schema from "@/db/schema"
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    schema: schema
  }),
  socialProviders:{ 
    google:{ 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }
  },
  	session: {
		cookieCache: {
			enabled: true,
            maxAge: 60 * 60 * 24 * 30 
		}
	},
});