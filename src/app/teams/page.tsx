import { DefaultLayout } from '~/components/DefaultLayout';
import { TeamsList } from '../components/Team/TeamsList';
import { serverTrpc } from '../_trpc/server';
import { unstable_cache } from 'next/cache';

interface TeamsPageProps {
  searchParams?: Promise<Record<string, string> | null | undefined>;
}

export const revalidate = 3600; // revalidate the data once per hour

//const teamListCached = cache(serverTrpc.team.list); // cache the data

// usage of unstable_cache to use the tag to invalidate the cache.
// Apparently, this could get replaced with "use cache" in the future.
const teamListCached = unstable_cache(
  async () => serverTrpc.team.list({}),
  [],
  {
    tags: ['teamList'],
    revalidate: 3600,
  },
);

export default async function TeamsPage({ searchParams }: TeamsPageProps) {
  const team_modal_shown = (await searchParams)?.team_modal;

  const teams = (await teamListCached()).sort((teamA, teamB) =>
    new Date(teamA.createdAt) > new Date(teamB.createdAt) ? 1 : -1,
  );

  const idPokemonsTeams = teams.map((team) =>
    team.pokemons.map((poke) => poke.idPokemon),
  );

  // double nested Promise.all
  // trpc batching is a treasure
  const pokemonsByTeams = await Promise.all(
    idPokemonsTeams.map((idPokemons) =>
      Promise.all(
        idPokemons.map((id) => serverTrpc.poke.getPokemonById({ id })),
      ),
    ),
  );

  const teamsWithPokemons = teams.map((team, indexTeam) => ({
    ...team,
    pokemons: team.pokemons.map((poke, indexPoke) => ({
      ...poke,
      ...pokemonsByTeams[indexTeam][indexPoke],
    })),
  }));

  return (
    <DefaultLayout>
      <TeamsList
        initTeams={teamsWithPokemons}
        team_modal_shown={team_modal_shown === 'true'}
      />
    </DefaultLayout>
  );
}
