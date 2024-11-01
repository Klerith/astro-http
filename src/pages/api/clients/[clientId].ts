import { prisma } from '@db';
import type { APIRoute } from 'astro';

export const prerender = false;

const findClientById = async (clientId: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    return client;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GET: APIRoute = async ({ params, request }) => {
  const { clientId = '' } = params;

  try {
    const client = await findClientById(clientId);

    if (!client) {
      return new Response(`Client with id ${clientId} not found`, {
        status: 404,
      });
    }

    const responseObj = JSON.stringify(client);

    return new Response(responseObj, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Bad request', {
      status: 400,
    });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { clientId = '' } = params;

  const client = await findClientById(clientId);

  if (!client) {
    return new Response(`Client with id ${clientId} not found`);
  }

  try {
    const { id, ...body } = await request.json();

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: body,
    });

    return new Response(JSON.stringify(updatedClient), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Bad request', {
      status: 400,
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { clientId = '' } = params;

  const client = await findClientById(clientId);

  if (!client) {
    return new Response(`Client with id ${clientId} not found`);
  }

  const deletedClient = await prisma.client.delete({
    where: {
      id: clientId,
    },
  });

  return new Response(
    JSON.stringify({
      msg: 'deleted',
      client: deletedClient,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
