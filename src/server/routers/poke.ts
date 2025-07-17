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
     * Get Pokemon details by Name
     */
  getPokemonByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await pokeApi.pokemon.getPokeByName(input.name);
    }),

  /**
   * Get Species details by ID
   */
  getSpeciesById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.species.getSpeciesById(input.id);
    }),
  
  /**
   * Get Evolution chain by ID
   */
  getEvolutionById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.evolution.getEvolutionById(input.id);
    }),
  
  /**
   * Get Move By ID
   */
  getMoveById: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      return await pokeApi.move.getMoveById(input.id);
      
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
  
  /*
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
});
