import { Controller } from '@nestjs/common';
import { Pokemon, pokemonContract } from '@repo/shared';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { PokemonService } from './pokemon.service';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

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
}
