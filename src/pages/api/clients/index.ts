import type { APIRoute } from 'astro';
import { v4 as UUID } from 'uuid';

import prisma from '@db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clients = await prisma.client.findMany();

  return new Response(JSON.stringify(clients), {
    status: 200,

    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const client = await prisma.client.create({
      data: {
        id: UUID(),
        ...body,
      },
    });

    return new Response(JSON.stringify(client), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response('Bad request', {
      status: 400,
    });
  }
};
