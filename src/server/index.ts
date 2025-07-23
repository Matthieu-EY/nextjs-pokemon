import { pokeRouter } from './routers/poke';
import { pokeCombatRouter } from './routers/pokeCombat';
import { teamRouter } from './routers/team';
import { createCallerFactory, publicProcedure, router } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  poke: pokeRouter,
  team: teamRouter,
  pokeCombat: pokeCombatRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
