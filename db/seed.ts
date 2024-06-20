import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { name: 'Kasim', age: 35, isActive: true },
    { name: 'Fernando', age: 25, isActive: true },
    { name: 'Carlos', age: 37, isActive: true },
    { name: 'Melissa', age: 25, isActive: false },
    { name: 'Emin', age: 15, isActive: true },
  ]);

  console.log('Seed executed');
}
