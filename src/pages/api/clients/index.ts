import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const responseObject = JSON.stringify({ method: 'GET' });
  return new Response(responseObject, {
    status: 200,

    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const responseObject = JSON.stringify({ method: 'POST' });
  return new Response(responseObject, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
