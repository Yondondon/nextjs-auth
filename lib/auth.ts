import {betterAuth} from "better-auth";
import {nextCookies} from "better-auth/next-js";
import {Pool} from "pg";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URI as string
  }),
  plugins: [
    nextCookies(),
  ],
});