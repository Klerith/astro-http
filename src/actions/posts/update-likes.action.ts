import { actions, defineAction } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';
import { z } from 'astro:schema';

export const updatePostLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    // const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    const { data, error } = await actions.getPostLikes(postId);
    if (error) {
      console.log(error);
      throw new Error('Algo salió mal');
    }

    const { exists, likes } = data;

    if (!exists) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: 0,
      };

      await db.insert(Posts).values(newPost);
    }

    await db
      .update(Posts)
      .set({
        likes: likes + increment,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});
