/**
 * POKE router with tRPC
 */

import { z } from 'zod';
import pokeApi from '~/libs/poke/api';
import { publicProcedure, router } from '~/server/trpc';

export const pokeRouter = router({
  /**
   * List pokemons
   */
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(2000).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const offset = parseInt(cursor ?? "50", 10);

      return await pokeApi.pokemon.listPokemon(offset, limit);
    }),

  /**
   * Get Pokemon details by ID
   */
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.pokemon.getPokeById(input.id);
    }),

  /**
   * Get Species details by ID
   */
  getSpeciesById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0)
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.species.getSpeciesById(input.id);
    })
});
