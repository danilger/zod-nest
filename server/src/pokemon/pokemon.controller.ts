import { Controller } from '@nestjs/common';
import { Pokemon, pokemonContract } from '@repo/shared';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { PokemonService } from './pokemon.service';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @TsRestHandler(pokemonContract.getPokemon, { validateResponses: true })
  async getPokemon() {
    return tsRestHandler(pokemonContract.getPokemon, async ({ params }) => {
      const pokemon = await this.pokemonService.getPokemon(params.id);

      if (!pokemon) {
        return { status: 404, body: null };
      }

      return { status: 200, body: pokemon };
    });
  }

  @TsRestHandler(pokemonContract.createPokemon, { validateResponses: true })
  async createPokemon() {
    return tsRestHandler(pokemonContract.createPokemon, async ({ body }) => {
      const pokemon = await this.pokemonService.createPokemon(body);
      return { status: 201, body: pokemon };
    });
  }

  @TsRestHandler(pokemonContract.updatePokemon, { validateResponses: true })
  async updatePokemon() {
    return tsRestHandler(pokemonContract.updatePokemon, async ({ params, body }) => {
      const pokemon = await this.pokemonService.updatePokemon(params.id, body);
      return { status: 200, body: pokemon };
    });
  }

  @TsRestHandler(pokemonContract.deletePokemon, { validateResponses: true })
  async deletePokemon() {
    return tsRestHandler(pokemonContract.deletePokemon, async ({ params }) => {
      await this.pokemonService.deletePokemon(params.id);
      return { status: 200, body: null };
    });
  }
}
