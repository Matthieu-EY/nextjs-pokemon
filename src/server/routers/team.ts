import { router, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Team.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultTeamSelect = {
  id: true,
  name: true,
  size: true,
  pokemons: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TeamSelect;

export const teamRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        offset: z.number().min(0).nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/v11/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const offset = input.offset ?? 0;

      const items = await prisma.team.findMany({
        select: defaultTeamSelect,
        skip: offset,
        take: limit,
        where: {},
        orderBy: {
          createdAt: 'desc',
        },
      });

      return items;
    }),
  getTeambyId: publicProcedure
    .input(
      z.object({
        id: z.number().min(0),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const team = await prisma.team.findUnique({
        where: { id },
        select: defaultTeamSelect,
      });
      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No team with id '${id}'`,
        });
      }
      return team;
    }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const team = await prisma.team.create({
        data: {
          name: input.name,
        },
        select: defaultTeamSelect,
      });
      return team;
    }),
});
