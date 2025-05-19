import { sql } from "drizzle-orm";
import { db } from "~/server/db";

export const getUser = db.query.users.findFirst({
    columns: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        profilePictureImageId: true,
    },
    where: (users, { eq }) => eq(users.id, sql.placeholder('id')),
}).prepare('get_user');

export type GetUser = NonNullable<Awaited<ReturnType<typeof getUser.execute>>>;