import { sql, type InferSelectModel } from "drizzle-orm";
import { index, pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

/* Schemas */
import { images } from "~/server/db/schema/images";
import { users } from "~/server/db/schema/users";

/* Utils */
import generateUniqueString from "~/server/utils/generateUniqueString";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const createTable = pgTableCreator((name) => `plotpond_${name}`);

export const contentRatingEnum = pgEnum('content_rating', ['G', 'PG', 'PG-13', 'R', 'NC-17']);
export const postTypeEnum = pgEnum('type', ['story', 'scenario']);

export const posts = createTable(
    "post",
    (d) => ({
        id: d.bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
        type: postTypeEnum().notNull(),
        rating: contentRatingEnum().notNull(),
        slug: d.varchar().$default(() => generateUniqueString(16)),
        title: d.varchar({ length: 50 }).notNull(),
        authorId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }),
        excerpt: d.text(),
        description: d.text().notNull(),
        imageId: d.bigint({ mode: "number" }).references(() => images.id, { onDelete: 'set null' }), // Featured image
        likes: d.integer().default(0).notNull(),
        views: d.integer().default(0).notNull(),
        tags: d.jsonb().$type<string[]>().default([]),
        content: d.jsonb().notNull(),
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }),
    (t) => [index("title_idx").on(t.title)],
);

export type Post = InferSelectModel<typeof posts>