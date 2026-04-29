import { db } from './client';
import { eq } from 'drizzle-orm';
import { pokemonTable } from './schema';

function seed() {
  const pokemonId = '025';
  const existing = db
    .select()
    .from(pokemonTable)
    .where(eq(pokemonTable.id, pokemonId))
    .get();

  if (existing) {
    return;
  }

  db.insert(pokemonTable)
    .values({
      id: pokemonId,
      name: 'Pikachu',
      type: 'Electric',
      description: 'Pikachu is a yellow mouse-like creature with big ears and a lightning bolt on its back.',
    })
    .run();
}

seed();
