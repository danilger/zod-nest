import { Injectable } from '@nestjs/common';
import type { Pokemon } from '@repo/shared';
import { z } from 'zod';

@Injectable()
export class PokemonService {
  async getPokemon(id: string): Promise<z.infer<typeof Pokemon>> {
    return {
      name: 'Pikachu',
      type: 'Electric',
      id,
    };
  }
}


