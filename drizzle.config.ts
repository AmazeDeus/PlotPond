import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
	schema: "./src/server/db/schema",
	dialect: "postgresql",
	casing: 'snake_case',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	tablesFilter: ["plotpond_*"],
} satisfies Config;
