import { getPostLikes } from './posts/get-post-likes.action';
import { updatePostsLikes } from './posts/update-post-likes.action';

export const server = {
  // Posts
  getPostLikes,
  updatePostsLikes,
};
