import { relations } from 'drizzle-orm';

/* Schemas */
import { users, follows, comments, postLikes, bookmarks } from '~/server/db/schema/users';
import { posts } from '~/server/db/schema/posts';
import { images, postImages } from '~/server/db/schema/images';

export const usersRelations = relations(users, ({ one, many }) => ({
    profilePicture: one(images, {
        fields: [users.profilePictureImageId],
        references: [images.id]
    }),

    posts: many(posts), // A user can author many posts

    // People this user is following
    following: many(follows, { relationName: 'UserFollowing' }),
    // People who follow this user
    followers: many(follows, { relationName: 'UserFollowers' }),

    commentsMade: many(comments),
    likesGiven: many(postLikes),
    bookmarksMade: many(bookmarks),
}));

// Relations for the 'follows' table to link back to the user profiles
export const followsRelations = relations(follows, ({ one }) => ({
    follower: one(users, {
        fields: [follows.followerId],
        references: [users.id],
        relationName: 'UserFollowers'
    }),
    followedBy: one(users, {
        fields: [follows.followingId],
        references: [users.id],
        relationName: 'UserFollowing'
    }),
}));

// Relations for other join tables (linking back to user and post)
export const postLikesRelations = relations(postLikes, ({ one }) => ({
    user: one(users, { fields: [postLikes.userId], references: [users.id] }),
    post: one(posts, { fields: [postLikes.postId], references: [posts.id] }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
    author: one(users, { fields: [comments.userId], references: [users.id] }),
    post: one(posts, { fields: [comments.postId], references: [posts.id] }),
    parentComment: one(comments, {
        fields: [comments.parentCommentId],
        references: [comments.id],
        relationName: "ThreadedCommentParent"
    }),
    replies: many(comments, {
        relationName: "ThreadedCommentParent"
    }),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
    user: one(users, { fields: [bookmarks.userId], references: [users.id] }),
    post: one(posts, { fields: [bookmarks.postId], references: [posts.id] }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
    // Featured image - direct reference 
    featuredImage: one(images, {
        fields: [posts.imageId],
        references: [images.id]
    }),
    // All images related to this post (including content images)
    postImages: many(postImages),
    likes: many(postLikes),
    comments: many(comments),
    bookmarks: many(bookmarks),
}));

export const imagesRelations = relations(images, ({ many }) => ({
    posts: many(postImages)
}));

export const postImagesRelations = relations(postImages, ({ one }) => ({
    post: one(posts, {
        fields: [postImages.postId],
        references: [posts.id]
    }),
    image: one(images, {
        fields: [postImages.imageId],
        references: [images.id]
    })
}));