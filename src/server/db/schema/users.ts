// src\server\db\schema\users.ts:

import { primaryKey, pgTableCreator, index, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { sql, type InferSelectModel } from 'drizzle-orm';
import { images } from "~/server/db/schema/images";
import { posts } from '~/server/db/schema/posts';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
const createTable = pgTableCreator((name) => `plotpond_${name}`);

// -------- USERS TABLE --------
export const users = createTable(
    "user",
    (d) => ({
        id: d.bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
        username: d.varchar({ length: 50 }).notNull().unique(),
        displayName: d.varchar({ length: 100 }),
        email: d.varchar({ length: 255 }).notNull().unique(),
        passwordHash: d.text().notNull(),
        bio: d.text(),
        profilePictureImageId: d.bigint({ mode: "number" }).notNull().references(() => images.id, { onDelete: 'set null' }),
        emailVerified: d.boolean().default(false).notNull(),
        emailVerificationToken: d.text().unique(),
        emailVerificationTokenExpiresAt: d.timestamp({ withTimezone: true }),
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }),
    (t) => [index("username_idx").on(t.username)],
);

// -------- RELATIONSHIP TABLES --------

// User Follows (Many-to-Many relationship between users)
export const follows = createTable(
    "follow",
    (d) => ({
        followerId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }), // The user who is following
        followingId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }), // The user who is being followed
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }),
    (t) => [primaryKey({ columns: [t.followerId, t.followingId] })] // Ensures a user can't follow another user multiple times
);

// Post Likes (Many-to-Many: User likes a Post)
export const postLikes = createTable(
    'post_like',
    (d) => ({
        userId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }),
        postId: d.bigint({ mode: "number" }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }),
    (t) => [primaryKey({ columns: [t.userId, t.postId] })]
);

// Comments (One-to-Many: User makes a Comment on a Post)
export const comments = createTable(
    'comment',
    (d) => ({
        id: d.bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
        content: d.text().notNull(),
        userId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }),
        postId: d.bigint({ mode: "number" }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
        parentCommentId: d.bigint({ mode: "number" }).references((): AnyPgColumn => comments.id, { onDelete: 'cascade' }), // Threaded comments
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }));

// Bookmarks (Many-to-Many: User bookmarks a Post)
export const bookmarks = createTable(
    'bookmark',
    (d) => ({
        userId: d.bigint({ mode: "number" }).notNull().references(() => users.id, { onDelete: 'cascade' }),
        postId: d.bigint({ mode: "number" }).notNull().references(() => posts.id, { onDelete: 'cascade' }),
        createdAt: d
            .timestamp({ withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    }),
    (t) => [primaryKey({ columns: [t.userId, t.postId] })]
);

export type User = InferSelectModel<typeof users>
export type Follow = InferSelectModel<typeof follows>
export type PostLike = InferSelectModel<typeof postLikes>
export type Comment = InferSelectModel<typeof comments>
export type Bookmark = InferSelectModel<typeof bookmarks>
