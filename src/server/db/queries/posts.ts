import { cache } from "react";
import { sql } from "drizzle-orm";
import { db } from "~/server/db";

export const _getTopPostsWithAuthorPrepared = db.query.posts.findMany({
    limit: sql.placeholder('limit'),
    with: {
        author: {
            with: {
                profilePicture: {
                    columns: {
                        name: true,
                        storageKey: true,
                        width: true,
                        height: true,
                    }
                }
            },
            columns: {
                username: true,
                displayName: true,
                bio: true,
            }
        },
        featuredImage: {
            columns: {
                name: true,
                altText: true,
                storageKey: true,
                width: true,
                height: true,
                caption: true,
                creditText: true,
            }
        },
    },
    columns: {
        id: true,
        title: true,
        excerpt: true,
        description: true,
        likes: true,
        views: true,
        tags: true,
        content: true,
        createdAt: true,
        updatedAt: true,
    },
    orderBy: (posts, { desc }) => [desc(posts.likes)],
    where: (posts, { eq }) => eq(posts.type, sql.placeholder('type')),
    extras: {
        timeAgoCreated: sql<string>`
            CASE
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 60
                    THEN CONCAT(FLOOR(EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at))::text, ' seconds ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 3600
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 60)::text, ' minutes ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 86400
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 3600)::text, ' hours ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 604800
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 86400)::text, ' days ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 2419200
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 604800)::text, ' weeks ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) < 29030400
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 2419200)::text, ' months ago')
                ELSE CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.created_at)) / 29030400)::text, ' years ago')
            END
        `.as('timeAgoCreated'),
        timeAgoUpdated: sql<string>`
            CASE
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 60
                    THEN CONCAT(FLOOR(EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at))::text, ' seconds ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 3600
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 60)::text, ' minutes ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 86400
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 3600)::text, ' hours ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 604800
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 86400)::text, ' days ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 2419200
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 604800)::text, ' weeks ago')
                WHEN (EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) < 29030400
                    THEN CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 2419200)::text, ' months ago')
                ELSE CONCAT(FLOOR((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM posts.updated_at)) / 29030400)::text, ' years ago')
            END
        `.as('timeAgoUpdated')
    }
}).prepare('get_top_posts_with_author')

export const _getRecentPostsPrepared = db.query.posts.findMany({
    limit: sql.placeholder('limit'),
    orderBy: (posts, { asc }) => [asc(posts.createdAt)],
    where: (posts, { eq }) => eq(posts.type, sql.placeholder('type')),
}).prepare('get_recent_posts');

export const getCachedTopPostsWithAuthor = cache(async (params: { limit: number, type: string }) => await _getTopPostsWithAuthorPrepared.execute(params));
export const getCachedRecentPosts = cache(async (params: { limit: number, type: string }) => await _getRecentPostsPrepared.execute(params));

export type GetTopPostsWithAuthor = NonNullable<Awaited<ReturnType<typeof getCachedTopPostsWithAuthor>>>;
export type GetRecentPosts = NonNullable<Awaited<ReturnType<typeof getCachedRecentPosts>>>;

