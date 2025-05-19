export { users, follows, comments, postLikes, bookmarks } from '~/server/db/schema/users';
export { posts, contentRatingEnum } from '~/server/db/schema/posts';
export { images, postImages } from '~/server/db/schema/images';
export {
    usersRelations,
    followsRelations,
    postLikesRelations,
    commentsRelations,
    bookmarksRelations,
    postsRelations,
    imagesRelations,
    postImagesRelations
} from '~/server/db/schema/relations';