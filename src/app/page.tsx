import { serverTrpc } from './_trpc/server';
import { DefaultLayout } from './components/DefaultLayout';
import { PokemonList } from './components/PokemonList/PokemonList';

export default async function HomePage() {
  const initialPokemons = await Promise.all(
    Array.from({length: 50}, (_,i) => i+1).map((id) => serverTrpc.poke.getPokemonById({ id }))
  );

  return (
    <DefaultLayout>
      <PokemonList 
        initialPokemons={initialPokemons} 
      />
    </DefaultLayout>
  );
}
