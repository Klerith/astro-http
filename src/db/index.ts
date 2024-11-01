// import { PrismaClient } from '@prisma/client';

// // Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// console.log({ env: process.env.NODE_ENV });

import type { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  import('@prisma/client').then((mod) => (prisma = new mod.PrismaClient()));
} else {
  import('@prisma/client/edge').then(
    (mod) => (prisma = new mod.PrismaClient())
  );
}
export { prisma };
