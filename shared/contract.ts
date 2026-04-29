import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const Pokemon = z
  .object({
    name: z.string(),
    type: z.string(),
    id: z.string(),
    description: z.string(),
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
  createPokemon: {
    method: 'POST',
    path: '/pokemon',
    body: Pokemon,
    responses: {
      201: Pokemon,
    },
    summary: 'Create pokemon',
  },
  updatePokemon: {
    method: 'PUT',
    path: '/pokemon/:id',
    body: Pokemon,
    responses: {
      200: Pokemon,
    },
    summary: 'Update pokemon',
  },
  deletePokemon: {
    method: 'DELETE',
    path: '/pokemon/:id',
    responses: {
      200: z.null(),
    },
    summary: 'Delete pokemon',
  },
});