import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getLikes } from './posts/get-likes.action';
import { updateLikeCount } from './posts/update-like-count.action';

export const server = {
  // myAction: defineAction({ /* ... */ })

  // Posts
  getLikes,
  updateLikeCount,
};
