import { serverTrpc } from './_trpc/server';
import { DefaultLayout } from './components/DefaultLayout';
import { PokemonListPage } from './components/PokemonList/PokemonListPage';
import { parseUrlAndGetParamInt } from '../utils/parse-url';
import { Pokemon } from '~/libs/poke/dto/pokemon';

export default async function HomePage() {
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
