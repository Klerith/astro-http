import { getGreeting } from './greetings/get-greeting.action';
import { getPostLikes } from './posts/get-post-likes.action';

export const server = {
  getGreeting,

  // posts
  getPostLikes,
};
