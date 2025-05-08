export interface Image {
    id: string;
    name?: string;
    altText?: string;
    storageKey: string; // The key or path to the image in the cloud storage
                        // Can end up being modified into `url: string;` depending on how the URLs end up being constructed
    mimeType: string;
    width: number;
    height: number;
    size: number;
    parentId: string;
    parentType: "post" | "user";
    uploadedAt: Date;
}

export interface User {
    id: string;
    username: string;
    displayName?: string | null;
    email: string;
    bio?: string | null;
    profilePictureUrl?: string | null; // Or derived from an Image relation
    emailVerified: boolean;
    // Will probably handle internally:
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

// Define Tag type to resolve lint error and for Post.tags
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
    id: string
    rating: ContentRating
    title: string
    author: User
    excerpt?: string
    description: string
    image?: Image
    likes: number
    views: number
    timeAgo: string
    tags?: Tag[]
    content: RichTextContent
}