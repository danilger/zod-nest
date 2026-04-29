import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const Pokemon = z
  .object({
    name: z.string(),
    type: z.string(),
    id: z.string(),
  })
  .strict();

export const pokemonContract = c.router({
  getPokemon: {
    method: 'GET',
    path: '/pokemon/:id',
    responses: {
      200: Pokemon,
      404: z.null(),
    },
    summary: 'Get a pokemon by id',
  },
});