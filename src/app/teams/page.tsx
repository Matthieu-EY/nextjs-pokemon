import { DefaultLayout } from "~/components/DefaultLayout";
import { TeamsList } from "../components/Team/TeamsList";
import { serverTrpc } from "../_trpc/server";


export default async function TeamsPage() {
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
      <TeamsList teams={teamsWithPokemons} />
    </DefaultLayout>
  )
}