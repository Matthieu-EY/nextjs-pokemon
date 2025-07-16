import { pokeRouter } from './routers/poke';
import { postRouter } from './routers/post';
import { teamRouter } from './routers/team';
import { createCallerFactory, publicProcedure, router } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
  poke: pokeRouter,
  team: teamRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
