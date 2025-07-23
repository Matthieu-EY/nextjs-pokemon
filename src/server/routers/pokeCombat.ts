import z from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/**
 * Default selector for PokemonCombat.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPokemonCombatSelect = {
  id: true,
  idPokemon: true,
  teamId: true,
} satisfies Prisma.PokemonCombatSelect;

export const pokeCombatRouter = router({
  add: publicProcedure
    .input(
      z.object({
        idTeam: z.number().min(0),
        idPokemon: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      const pokemonCombat = await prisma.pokemonCombat.create({
        data: {
          idPokemon: input.idPokemon,
          teamId: input.idTeam,
        },
        select: defaultPokemonCombatSelect,
      });
      return pokemonCombat;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      const deletedPokemonCombat = await prisma.pokemonCombat.delete({
        where: {
          id: input.id,
        },
      });
      return deletedPokemonCombat;
    }),
  
  deletePokemonInTeam: publicProcedure
    .input(
      z.object({
        idPokemon: z.number().min(0),
        idTeam: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      const deletedPokemonCombat = await prisma.pokemonCombat.deleteMany({
        where: {
          idPokemon: input.idPokemon,
          teamId: input.idTeam,
        },
        limit: 1,
      });
      return deletedPokemonCombat;
    })
});
