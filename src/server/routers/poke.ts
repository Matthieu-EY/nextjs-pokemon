/**
 * POKE router with tRPC
 */

import { z } from 'zod';
import pokeApi from '~/libs/poke/api';
import { publicProcedure, router } from '~/server/trpc';

export const pokeRouter = router({
  /**
   * List pokemons details 
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

      const offset = parseInt(cursor ?? "0", 10);

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
    }),
  
  /**
   * Get Type By ID
   */
  getTypeById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.type.getTypeById(input.id);
    }),
  
  /**
   * Get Type By Name
   */
  getTypeByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input}) => {
      return await pokeApi.type.getTypeByName(input.name);
    }),
});
