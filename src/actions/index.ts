import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  obtenerSaludo: defineAction({
    input: z.object({
      name: z.string(),
      age: z.number(),
      isActive: z.boolean(),
    }),
    handler: async ({ name, age, isActive }) => {
      console.log(`Desde el server ${age} ${name}`);
      console.log({ name, age, isActive });

      return `Hello, ${name} - ${age}!`;
    },
  }),
};
