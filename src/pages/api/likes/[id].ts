import type { APIRoute } from 'astro';
import { Posts, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? '';

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

  if (posts.length === 0) {
    const post = {
      id: postId,
      title: 'Post not found',
      likes: 0,
    };

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(posts.at(0)), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
