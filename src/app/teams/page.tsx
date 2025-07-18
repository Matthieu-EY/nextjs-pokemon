import { DefaultLayout } from "~/components/DefaultLayout";
import { TeamsList } from "../components/Team/TeamsList";
import { serverTrpc } from "../_trpc/server";

interface TeamsPageProps {
  searchParams?: Promise<Record<string, string> | null | undefined>;
}

export default async function TeamsPage({ searchParams }: TeamsPageProps) {
  const team_modal_shown = (await searchParams)?.team_modal;

  const teams = await serverTrpc.team.list({});

  const idPokemonsTeams = teams.map((team) => team.pokemons.map((poke) => poke.idPokemon));

  const pokemonsByTeams = await Promise.all(
    idPokemonsTeams.map((idPokemons) => Promise.all(
      idPokemons.map((id) => serverTrpc.poke.getPokemonById({ id }))
    ))
  );

  const teamsWithPokemons = teams.map((team, indexTeam) => ({
    ...team,
    pokemons: team.pokemons.map((poke, indexPoke) => ({
      ...poke,
      ...pokemonsByTeams[indexTeam][indexPoke] 
    }))
    })
  );

  return (
    <DefaultLayout>
      <TeamsList teams={teamsWithPokemons} team_modal_shown={team_modal_shown == "true"} />
    </DefaultLayout>
  )
}