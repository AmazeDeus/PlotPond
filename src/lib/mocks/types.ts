import type { Post as DbPost } from '~/server/db/schema/posts';

export interface Image {
    id: number;
    name: string;
    altText?: string;
    storageKey: string; // The key or path to the image in the cloud storage
    // Can end up being modified into `url: string;` depending on how the URLs end up being constructed
    mimeType: string;
    width: number;
    height: number;
    size: number;
    parentId: number;
    parentType: "post" | "user";
    uploadedAt: Date;
}

export interface User {
    id: number;
    username: string;
    displayName?: string | null;
    email: string;
    bio?: string | null;
    profilePicture?: Image | null;
    emailVerified: boolean;
    // emailVerificationToken?: string | null;
    // emailVerificationTokenExpiresAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    // Counts can be useful and often denormalized or calculated via queries
    // For example, when fetching a user's profile:
    _count?: {
        posts?: number;
        followers?: number;
        following?: number;
        comments?: number;
        likesGiven?: number;
        bookmarks?: number;
    } | null;
    // Relationships (typically fetched on demand or through specific queries)
    // posts?: Post[];
    // followers?: User[];
    // following?: User[];
    // likedPosts?: Post[];
    // bookmarkedPosts?: Post[];
    // comments?: Comment[];
}

// Ambigous type for now.
export type Tag = string;

export enum ContentRating {
    G = "G",           // General audiences, suitable for all ages
    PG = "PG",         // Parental guidance suggested
    PG13 = "PG-13",    // Parents strongly cautioned, some material may be inappropriate for children under 13
    R = "R",           // Restricted, under 17 requires accompanying parent or adult guardian
    NC17 = "NC-17",    // No one 17 and under admitted
}

// Basic types for rich text content.
// This is a simplified representation and will probably be adapted
// based on the specific rich text editor or format used later (Slate, TipTap, ProseMirror).

/**
 * Represents a piece of text, potentially with formatting marks.
 */
export interface RichTextSpan {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    // link?: string;
}

/**
 * Represents a block-level element in the rich text content.
 */
export interface RichTextElement {
    type:
    | 'paragraph'
    | 'heading'
    | 'image'
    | 'list' // Could be 'ordered-list' or 'bulleted-list'
    | 'listItem'
    | 'codeBlock'
    | 'blockquote'
    | 'divider';
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For 'heading' type
    url?: string; // For 'image' type
    altText?: string; // For 'image' type
    language?: string; // For 'codeBlock' type
    // Children can be text spans (for paragraphs, headings, list items)
    // or other elements (e.g., list items within a list).
    children?: Array<RichTextSpan | RichTextElement>;
}

/**
 * The overall rich text content, typically an array of block-level elements.
 */
export type RichTextContent = RichTextElement[];

export type Post = {
    id: number
    slug: string
    type: 'story' | 'scenario'
    rating: ContentRating
    title: string
    author: User // In prod will only populate the id
    excerpt?: string
    description: string
    image?: Image // In prod will only populate the image id
    likes: number
    views: number
    bookmarks: number
    timeAgo: string
    tags?: Tag[]
    content: DbPost['content']
    createdAt: Date
    updatedAt: Date
}