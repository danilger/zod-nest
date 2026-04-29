import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Pokemon } from '@repo/shared';
import type { AssertTrue, IsExact } from '../shared/types/compile-time';
import { z } from 'zod';

export const pokemonTable = sqliteTable('pokemon', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
});

// проверяем, что типы совпадают иначе будет ошибка компиляции
export type PokemonRow = typeof pokemonTable.$inferSelect;
export type NewPokemonRow = typeof pokemonTable.$inferInsert;

type ContractPokemon = z.infer<typeof Pokemon>;
type DbPokemon = PokemonRow;

type _PokemonShapeMustMatchContract = AssertTrue<IsExact<DbPokemon, ContractPokemon>>;
