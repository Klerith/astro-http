import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import prisma from '@db';

export const updateLikeCount = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      const newPost = await prisma.post.create({
        data: {
          id: postId,
          likes: increment,
          title: `${postId} - new post`,
        },
      });

      return newPost;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: post.likes + increment,
      },
    });

    return updatedPost;
  },
});
