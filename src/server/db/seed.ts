import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { reset } from 'drizzle-seed';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

// Mocks
import { topStories, topScenarios } from '~/lib/mocks/topPostData';

// Schema
import * as schema from '~/server/db/schema';

// Types
import type { User } from '~/server/db/schema/users';
import type { Post } from '~/server/db/schema/posts';
import type { PostImage } from '~/server/db/schema/images';

/**
 * Seeds the database with initial data for development and testing.
 *
 * The seeding process follows these main steps:
 * 1. Reset all tables to ensure a clean state.
 * 2. Generate and insert images (for user profiles and posts).
 * 3. Generate and insert users, linking them to their profile pictures.
 * 4. Establish "follow" relationships between users.
 * 5. Generate and insert posts, linking them to authors and featured images.
 * 6. Create `postImages` relationships to link posts with their various images (featured, content, gallery).
 * 7. Generate and insert post likes, then update the like counts on the posts by recounting from the `postLikes` table.
 * 8. Generate and insert comments, including threaded replies.
 * 9. Generate and insert bookmarks.
 *
 * Mock data from `topStories` and `topScenarios` is used as a base, supplemented by
 * data generated using `faker.js`.
 *
 * @param db - The Drizzle database instance.
 */
export async function seedDatabase(db: ReturnType<typeof drizzle>) {
    // Reset all tables before seeding to ensure a clean environment.
    // This is crucial for idempotent seeding.
    await reset(db, schema);
    console.log(`Seeding ${topStories.length + topScenarios.length} total authors/posts based on mock data.`);

    console.log('📝 Generating mock data...');

    // --- Step 1: Create Images ---
    // Images are created first because they are referenced by both users (profile pictures)
    // and posts (featured images, content images).
    const userProfileImagesData = [];
    const postImagesData = [];

    // Combine mock posts from stories and scenarios to process authors and their images.
    const mockPosts = [...topStories, ...topScenarios];
    // Extract unique authors from the mock posts to avoid duplicate user creation.
    const uniqueAuthors = Array.from(
        new Map(mockPosts.map(post => [post.author.id, post.author])).values()
    );

    // Generate data for user profile images based on unique mock authors.
    console.log('🖼️ Preparing user profile image data...');
    for (let i = 0; i < uniqueAuthors.length; i++) {
        const author = uniqueAuthors[i];
        if (!author) continue;

        userProfileImagesData.push({
            name: author.profilePicture?.name ?? `profile_${author.username}`,
            altText: author.profilePicture?.altText ?? `Profile picture of ${author.displayName}`,
            storageKey: `${author.profilePicture?.storageKey ?? faker.string.uuid()}_${i}.png`,
            mimeType: author.profilePicture?.mimeType ?? 'image/jpeg',
            width: author.profilePicture?.width ?? faker.number.int({ min: 200, max: 800 }),
            height: author.profilePicture?.height ?? faker.number.int({ min: 200, max: 800 }),
            size: author.profilePicture?.size ?? faker.number.int({ min: 50000, max: 2000000 }),
            caption: `Profile picture of ${author.displayName}`,
            creditText: faker.helpers.arrayElement(['', 'Self portrait', 'Photo credit: ' + faker.person.fullName()]),
        });
    }

    // Generate data for post images (featured and additional content images).
    console.log('🖼️ Preparing post image data...');
    for (let i = 0; i < mockPosts.length; i++) {
        const post = mockPosts[i];
        if (!post) continue;

        // Create a featured image for each mock post.
        postImagesData.push({
            name: post.image?.name ?? `featured_${i}`,
            altText: post.image?.altText ?? `Featured image for ${post.title}`,
            storageKey: `${post.image?.storageKey ?? faker.string.uuid()}_${i}.png`,
            mimeType: post.image?.mimeType ?? 'image/jpeg',
            width: post.image?.width ?? faker.number.int({ min: 800, max: 2000 }),
            height: post.image?.height ?? faker.number.int({ min: 600, max: 1500 }),
            size: post.image?.size ?? faker.number.int({ min: 100000, max: 5000000 }),
            caption: `Featured image for ${post.title}`,
            creditText: faker.helpers.arrayElement(['', 'Original artwork', 'Photo credit: ' + faker.person.fullName()]),
        });

        // Add a random number (0-3) of additional content images per post.
        /* const additionalImageCount = faker.number.int({ min: 0, max: 3 });
        for (let j = 0; j < additionalImageCount; j++) {
            postImagesData.push({
                name: `content_${i}_${j}.jpg`,
                altText: `Additional image for ${post.title}`,
                storageKey: `${faker.string.uuid()}.jpg`,
                mimeType: 'image/jpeg',
                width: faker.number.int({ min: 600, max: 1600 }),
                height: faker.number.int({ min: 400, max: 1200 }),
                size: faker.number.int({ min: 80000, max: 3000000 }),
                caption: faker.helpers.arrayElement(['', faker.lorem.sentence()]),
                creditText: faker.helpers.arrayElement(['', 'Image credit: ' + faker.person.fullName()]),
            });
        } */
    }

    // Insert all prepared image data into the 'images' table.
    const allImagesData = [...userProfileImagesData, ...postImagesData];
    console.log(`📸 Inserting ${allImagesData.length} images...`);
    const insertedImages = await db.insert(schema.images).values(allImagesData).returning();
    console.log(`✅ ${insertedImages.length} images inserted`);

    // Map mock author IDs to their corresponding inserted profile image records.
    const profileImageMap: Record<string, typeof insertedImages[0]> = {};
    for (let i = 0; i < uniqueAuthors.length; i++) {
        const author = uniqueAuthors[i];
        const image = insertedImages[i];
        if (author && image) {
            profileImageMap[author.id] = image;
        }
    }

    // Map mock post IDs to their corresponding inserted featured image records.
    const featuredImageMap: Record<string, typeof insertedImages[0]> = {};
    for (let i = 0; i < mockPosts.length; i++) {
        const post = mockPosts[i];
        const image = insertedImages[uniqueAuthors.length + i];
        if (post && image) {
            featuredImageMap[post.id] = image;
        }
    }

    // Collect any remaining images, which are content images not directly mapped yet.
    const contentImages = insertedImages.slice(uniqueAuthors.length + mockPosts.length);

    // --- Step 2: Create Users ---
    // Users are created after images so their profilePictureImageId can be set.
    const hashedPassword = await bcrypt.hash('Password123!', 10); // Generic password for all mock users.
    const usersData: User[] = [];

    // Create user data based on the unique authors extracted from mock data.
    uniqueAuthors.forEach((author) => {
        const profileImage = profileImageMap[author.id]; // Get the previously created profile image.
        usersData.push({
            username: author.username,
            displayName: author.displayName ?? author.username, // Fallback to username if displayName is not available
            email: author.email,
            passwordHash: hashedPassword,
            bio: author.bio ?? faker.lorem.paragraph(),
            profilePictureImageId: profileImage?.id ?? null,
            emailVerified: author.emailVerified ?? faker.datatype.boolean(0.8),
            emailVerificationToken: null,
            emailVerificationTokenExpiresAt: null,
        } as User);
    });

    console.log(`👤 Inserting ${usersData.length} users...`);
    const insertedUsers = await db.insert(schema.users).values(usersData).returning();
    console.log(`✅ ${insertedUsers.length} users inserted`);

    // --- Step 3: Create Follow Relationships ---
    // Establishes a social graph where users follow each other.
    const followsData = [];
    for (const user of insertedUsers) {
        const otherUsers = insertedUsers.filter(u => u.id !== user.id); // Users cannot follow themselves.
        const followCount = faker.number.int({ min: 2, max: Math.min(8, otherUsers.length) }); // Each user follows 2-8 others.

        const usersToFollow = faker.helpers.arrayElements(otherUsers, followCount);
        for (const followedUser of usersToFollow) {
            followsData.push({
                followerId: user.id,
                followingId: followedUser.id,
            });
        }
    }

    console.log(`👥 Inserting ${followsData.length} follow relationships...`);
    const insertedFollows = await db.insert(schema.follows).values(followsData).returning();
    console.log(`✅ ${insertedFollows.length} follow relationships inserted`);

    // --- Step 4: Create Posts ---
    // Posts are created after users (for authorId) and images (for imageId/featured image).
    const postsData: Post[] = [];

    // Create a map from mock author ID to actual database user ID for linking posts to authors.
    const userIdMap: Record<number, number> = insertedUsers.reduce((acc, user, index) => {
        const mockAuthor = uniqueAuthors.find(a => a.username === user.username);
        if (mockAuthor) {
            acc[mockAuthor.id] = user.id;
        }
        return acc;
    }, {} as Record<number, number>);

    // Create post data based on the combined mock stories and scenarios.
    mockPosts.forEach((mockPost) => {
        if (!mockPost) return;

        const featuredImage = featuredImageMap[mockPost.id];

        // Handle post content: ensure it's always in JSONB format
        let content: any;
        if (typeof mockPost.content === 'string') {
            // If it's a string, wrap it in a JSONB structure
            content = {
                type: 'text',
                content: mockPost.content
            };
        } else if (mockPost.content && typeof mockPost.content === 'object' && 'children' in mockPost.content) {
            // If it's already a structured object, use it as is
            content = mockPost.content;
        } else {
            // Create a default JSONB structure with the description or generated text
            content = {
                type: 'text',
                content: mockPost.description || faker.lorem.paragraphs(3)
            };
        }

        // Map mock author ID to the actual database user ID. Fallback to the first user if not found.
        const authorId = userIdMap[mockPost.author.id] || insertedUsers[0]?.id;
        if (!authorId) return;

        postsData.push({
            title: mockPost.title,
            type: mockPost.type ?? 'story',
            slug: mockPost.slug,
            rating: mockPost.rating as 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17',
            authorId,
            excerpt: mockPost.excerpt ?? null,
            description: mockPost.description ?? faker.lorem.paragraph(),
            imageId: featuredImage?.id ?? null,
            content,
            likes: 0,
            views: mockPost.views ?? faker.number.int({ min: 5, max: 500 }),
            tags: mockPost.tags ?? [],
        } as Post);
    });

    console.log(`📝 Inserting ${postsData.length} posts...`);
    const insertedPosts = await db.insert(schema.posts).values(postsData).returning();
    console.log(`✅ ${insertedPosts.length} posts inserted`);

    // --- Step 5: Create Post Image Relationships (postImages table) ---
    // Links posts to their images (featured, rich_content, gallery) via the join table.
    const postImageRelationsData: PostImage[] = [];

    // Add featured images to the postImages join table.
    insertedPosts.forEach((post) => {
        if (post.imageId) {
            postImageRelationsData.push({
                postId: post.id,
                imageId: post.imageId,
                purpose: 'featured',
                sortOrder: 0,
            } as PostImage);
        }
    });

    // Distribute the remaining 'contentImages' randomly among posts.
    let contentPositionCounter = 1; // Counter for positioning rich_content images.
    contentImages.forEach((image) => {
        const randomPost = faker.helpers.arrayElement(insertedPosts); // Assign to a random post.
        const purpose = faker.helpers.arrayElement(['rich_content', 'gallery']); // Randomly assign purpose.
        const relation: any = {
            postId: randomPost.id,
            imageId: image.id,
            purpose,
        };
        if (purpose === 'rich_content') {
            relation.contentPosition = contentPositionCounter++; // Assign sequential position for rich content.
        }
        if (purpose === 'gallery') {
            relation.sortOrder = faker.number.int({ min: 1, max: 10 }); // Assign random sort order for gallery.
        }
        postImageRelationsData.push(relation);
    });

    console.log(`🖼️ Inserting ${postImageRelationsData.length} post image relations...`);
    if (postImageRelationsData.length > 0) {
        const insertedPostImageRelations = await db.insert(schema.postImages).values(postImageRelationsData).returning();
        console.log(`✅ ${insertedPostImageRelations.length} post image relations inserted`);
    } else {
        console.log('ℹ️ No additional post image relations to insert.');
    }


    // --- Step 6: Create Post Likes and Update Counts ---
    const postLikesData = [];
    // This variable is used to determine how many like records to *create* based on mock data.
    const mockPostLikeTargets: Record<number, number> = {};

    insertedPosts.forEach((post, index) => {
        if (index < mockPosts.length) {
            const mockPost = mockPosts[index];
            if (mockPost) {
                mockPostLikeTargets[post.id] = mockPost.likes ?? 0;
            } else {
                mockPostLikeTargets[post.id] = 0;
            }
        } else {
            // For posts not in mock data, if any, for now just assume they start with 0 likes unless users are randomly assigned in the commented block below.
            mockPostLikeTargets[post.id] = 0;
        }
    });

    // Generate post like records based on mock data targets.
    for (const post of insertedPosts) {
        const targetLikeCount = mockPostLikeTargets[post.id] || 0;
        if (targetLikeCount > 0 && insertedUsers.length > 0) {
            const likeUsers = faker.helpers.arrayElements(
                insertedUsers,
                Math.min(targetLikeCount, insertedUsers.length) // Don't pick more users than available
            );
            for (const user of likeUsers) {
                postLikesData.push({
                    userId: user.id,
                    postId: post.id,
                });
            }
        }
    }

    // This would add completely random likes for posts not covered by mocks, if any, e.g.:
    // for (const post of insertedPosts) {
    //   if (!mockPostLikeTargets[post.id] && insertedUsers.length > 0) { // If not covered by mocks
    //     if (faker.datatype.boolean(0.3)) { // 30% chance of getting some likes
    //       const randomLikeCount = faker.number.int({ min: 1, max: Math.min(5, insertedUsers.length) });
    //       const likeUsers = faker.helpers.arrayElements(insertedUsers, randomLikeCount);
    //       for (const user of likeUsers) {
    //         if (!postLikesData.some(pl => pl.postId === post.id && pl.userId === user.id)) {
    //           postLikesData.push({ userId: user.id, postId: post.id });
    //         }
    //       }
    //     }
    //   }
    // }

    console.log(`👍 Inserting ${postLikesData.length} post like records...`);
    if (postLikesData.length > 0) {
        const insertedPostLikes = await db.insert(schema.postLikes).values(postLikesData).returning();
        console.log(`✅ ${insertedPostLikes.length} post like records inserted`);
    } else {
        console.log('ℹ️ No post likes to insert.');
    }

    console.log('🔄 Recounting and updating post like counts on posts table...');

    // First, set all post likes to 0 to handle posts that might have lost all likes
    await db.update(schema.posts).set({ likes: 0 });

    // Then, get the actual like counts from the postLikes table
    const actualLikeCounts = await db
        .select({
            postId: schema.postLikes.postId,
            // Use sql.raw or sql`` to specify the count aggregate function
            // and mapWith(Number) to ensure the type is number.
            likes: sql<number>`cast(count(${schema.postLikes.postId}) as int)`.mapWith(Number),
        })
        .from(schema.postLikes)
        .groupBy(schema.postLikes.postId);

    // Update the posts table with the new counts
    if (actualLikeCounts.length > 0) {
        for (const countData of actualLikeCounts) {
            await db.update(schema.posts)
                .set({ likes: countData.likes })
                .where(eq(schema.posts.id, countData.postId));
        }
        console.log(`✅ Updated like counts for ${actualLikeCounts.length} posts based on recounting.`);
    } else {
        console.log('ℹ️ No likes found in postLikes table to update counts with.');
    }

    // --- Step 7: Create Comments ---
    // Generates top-level comments and threaded replies.
    const commentsData = [];

    // Create a set number of top-level comments, distributed among posts.
    // More comments are biased towards posts derived from mock data.
    for (let i = 0; i < 50; i++) {
        const randomUser = faker.helpers.arrayElement(insertedUsers);
        if (!randomUser) continue;

        let randomPost;
        if (faker.datatype.boolean(0.7) && mockPosts.length > 0 && insertedPosts.length >= mockPosts.length) {
            const index = faker.number.int({ min: 0, max: Math.min(mockPosts.length, insertedPosts.length) - 1 });
            randomPost = insertedPosts[index];
        } else {
            randomPost = faker.helpers.arrayElement(insertedPosts);
        }
        if (!randomPost) continue;

        commentsData.push({
            content: faker.lorem.paragraph(),
            userId: randomUser.id,
            postId: randomPost.id,
            parentCommentId: null,
        });
    }

    console.log(`💬 Inserting ${commentsData.length} top-level comments...`);
    const insertedComments = await db.insert(schema.comments).values(commentsData).returning();
    console.log(`✅ ${insertedComments.length} top-level comments inserted`);

    // Create reply comments for a subset of the top-level comments.
    const repliesData = [];
    // Approx 30% of comments will receive 1-3 replies.
    const commentsToReplyTo = faker.helpers.arrayElements(
        insertedComments,
        Math.floor(insertedComments.length * 0.3)
    );

    for (const comment of commentsToReplyTo) {
        const replyCount = faker.number.int({ min: 1, max: 3 });
        for (let i = 0; i < replyCount; i++) {
            const randomUser = faker.helpers.arrayElement(insertedUsers);
            repliesData.push({
                content: faker.lorem.paragraph(),
                userId: randomUser.id,
                postId: comment.postId, // Reply is on the same post as the parent.
                parentCommentId: comment.id, // Link to the parent comment's ID.
            });
        }
    }
    if (repliesData.length > 0) {
        console.log(`💬 Inserting ${repliesData.length} reply comments...`);
        const insertedReplies = await db.insert(schema.comments).values(repliesData).returning();
        console.log(`✅ ${insertedReplies.length} reply comments inserted`);
    } else {
        console.log('ℹ️ No reply comments to insert.');
    }


    // --- Step 8: Create Bookmarks ---
    // Users can bookmark posts. This seeds initial bookmark data.
    const bookmarksData = [];

    // Generate bookmarks based on mock data bookmark counts.
    for (let i = 0; i < Math.min(mockPosts.length, insertedPosts.length); i++) {
        const post = insertedPosts[i];
        const mockPost = mockPosts[i];
        if (!post || !mockPost) continue;

        const bookmarkCountForMockPost = mockPost.bookmarks || 0;

        if (bookmarkCountForMockPost > 0) {
            const bookmarkUsers = faker.helpers.arrayElements(
                insertedUsers,
                Math.min(bookmarkCountForMockPost, insertedUsers.length)
            );
            for (const user of bookmarkUsers) {
                if (!user) continue;
                bookmarksData.push({
                    userId: user.id,
                    postId: post.id,
                });
            }
        }
    }

    // For any additional posts not covered by mock data, add some random bookmarks.
    for (let i = mockPosts.length; i < insertedPosts.length; i++) {
        const post = insertedPosts[i];
        if (!post) continue;

        for (const user of insertedUsers) {
            if (!user) continue;
            if (faker.datatype.boolean(0.2)) {
                bookmarksData.push({
                    userId: user.id,
                    postId: post.id,
                });
            }
        }
    }

    console.log(`🔖 Inserting ${bookmarksData.length} bookmarks...`);
    if (bookmarksData.length > 0) {
        const insertedBookmarks = await db.insert(schema.bookmarks).values(bookmarksData).returning();
        console.log(`✅ ${insertedBookmarks.length} bookmarks inserted`);
    } else {
        console.log('ℹ️ No bookmarks to insert.');
    }


    console.log('✅ Database seeding completed successfully');
}