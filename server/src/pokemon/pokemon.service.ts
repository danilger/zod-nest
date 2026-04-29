import { Injectable } from '@nestjs/common';
import type { Pokemon } from '@repo/shared';
import { z } from 'zod';
import { PokemonRepository } from './pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getPokemon(id: string): Promise<z.infer<typeof Pokemon> | null> {
    return this.pokemonRepository.getPokemonById(id);
  }

  async createPokemon(data: z.infer<typeof Pokemon>): Promise<z.infer<typeof Pokemon>> {
    return this.pokemonRepository.createPokemon(data);
  }

  async updatePokemon(id: string, data: z.infer<typeof Pokemon>): Promise<z.infer<typeof Pokemon>> {
    return this.pokemonRepository.updatePokemon(id, data);
  }

  async deletePokemon(id: string): Promise<void> {
    await this.pokemonRepository.deletePokemon(id);
  }
}