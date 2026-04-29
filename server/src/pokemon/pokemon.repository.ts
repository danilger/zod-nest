import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pokemon } from '@repo/shared';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { DB_CLIENT } from '../db/database.module';
import { pokemonTable, type PokemonRow } from '../db/schema';
import type { DbClient } from '../db/client';

type ContractPokemon = z.infer<typeof Pokemon>;

@Injectable()
export class PokemonRepository {
  constructor(@Inject(DB_CLIENT) private readonly db: DbClient) {}

  async getPokemonById(id: string): Promise<ContractPokemon | null> {
    const row = this.db.select().from(pokemonTable).where(eq(pokemonTable.id, id)).get();
    return this.validateRow(row);
  }

  async createPokemon(data: ContractPokemon): Promise<ContractPokemon> {
    this.db.insert(pokemonTable).values(data).run();
    const row = this.db.select().from(pokemonTable).where(eq(pokemonTable.id, data.id)).get();
    const parsed = this.validateRow(row);

    if (!parsed) {
      throw new InternalServerErrorException('Created row is missing');
    }

    return parsed;
  }

  async updatePokemon(id: string, data: ContractPokemon): Promise<ContractPokemon> {
    this.db
      .update(pokemonTable)
      .set({
        id: data.id,
        name: data.name,
        type: data.type,
        description: data.description,
      })
      .where(eq(pokemonTable.id, id))
      .run();

    const row = this.db.select().from(pokemonTable).where(eq(pokemonTable.id, data.id)).get();
    const parsed = this.validateRow(row);

    if (!parsed) {
      throw new InternalServerErrorException('Updated row is missing');
    }

    return parsed;
  }

  async deletePokemon(id: string): Promise<void> {
    this.db.delete(pokemonTable).where(eq(pokemonTable.id, id)).run();
  }

  private validateRow(row: PokemonRow | undefined): ContractPokemon | null {
    if (!row) {
      return null;
    }

    const parsed = Pokemon.safeParse(row);
    if (!parsed.success) {
      throw new InternalServerErrorException(
        `Pokemon row violates contract: ${parsed.error.message}`,
      );
    }

    return parsed.data;
  }
}
