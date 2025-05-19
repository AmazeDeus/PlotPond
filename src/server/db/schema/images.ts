import { sql, type InferSelectModel } from "drizzle-orm";
import { index, pgEnum, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";

/* Schemas */
import { posts } from "~/server/db/schema/posts";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const createTable = pgTableCreator((name) => `plotpond_${name}`);

export const imageParentTypeEnum = pgEnum('image_parent_type', ['user', 'post']);
export const imagePurposeEnum = pgEnum('image_purpose', ['profile_picture', 'featured', 'rich_content', 'gallery']);

export const images = createTable(
    "image",
    (d) => ({
        id: d.bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
        name: d.varchar({ length: 255 }),
        altText: d.text(),
        storageKey: d.varchar({ length: 1024 }).notNull().unique(),
        mimeType: d.varchar({ length: 50 }).notNull(),
        width: d.integer().notNull(),
        height: d.integer().notNull(),
        size: d.integer().notNull(),
        // Metadata that could be useful
        caption: d.text(),
        creditText: d.text(),
        uploadedAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull()
    })
);

export const postImages = createTable(
    "post_image",
    (d) => ({
        postId: d.bigint({ mode: "number" }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
        imageId: d.bigint({ mode: "number" }).notNull().references(() => images.id, { onDelete: 'cascade' }),
        // Purpose field to categorize the image usage
        purpose: imagePurposeEnum().default('rich_content').notNull(),
        // For content images, this stores their position in the rich text
        contentPosition: d.integer(),
        // For gallery images, this is display order
        sortOrder: d.integer().default(0),
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull()
    }),
    (t) => [
        primaryKey({ columns: [t.postId, t.imageId] }),
        index("post_images_post_idx").on(t.postId),
        index("post_images_image_idx").on(t.imageId),
        index("post_images_purpose_idx").on(t.purpose)
    ]
);

export type Image = InferSelectModel<typeof images>
export type PostImage = InferSelectModel<typeof postImages>