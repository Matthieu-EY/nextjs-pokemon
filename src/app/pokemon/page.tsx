import { parseUrlAndGetParamInt } from "~/utils/parse-url";
import { serverTrpc } from "../_trpc/server";
import { Pokemon } from "~/libs/poke/dto/pokemon";
import { DefaultLayout } from "../components/DefaultLayout";
import { PokemonListPage } from "../components/PokemonList/PokemonListPage";

export default async function PokemonPage() {
  const firstPokemons = await serverTrpc.poke.list({ limit: 50 })
    const firstPokemonDetailsResponse = await Promise.all(
      firstPokemons.results.map((pokemon) => serverTrpc.poke.getPokemonById({ id: parseUrlAndGetParamInt(pokemon.url)}))
    );
  
    const firstPokemonDetailsById = firstPokemonDetailsResponse.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: curr
      }
    }, {} as Record<string, Pokemon>)
  
    return (
      <DefaultLayout>
        <PokemonListPage
          initialPokemonList={firstPokemons}
          initialPokemonDetails={firstPokemonDetailsById} 
        />
      </DefaultLayout>
    );
}