import { notFound } from 'next/navigation';
import { DefaultLayout } from '../../components/DefaultLayout';
import { serverTrpc } from '~/app/_trpc/server';
import { PokemonDetail } from '~/app/components/Pokemon/Pokemon';
import { getTokenFromUrl } from '~/utils/get-token-from-url';

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;

  const id = parseInt(idParam, 10);

  try {
    const pokemon = await serverTrpc.poke.getPokemonById({ id });
    
    const speciesId = parseInt(getTokenFromUrl(pokemon.species.url, 30), 10);
    const species = await serverTrpc.poke.getSpeciesById({ id: speciesId });

    const evolutionChainID = parseInt(getTokenFromUrl(species.evolution_chain.url, 30), 10);
    const evolution_chain = await serverTrpc.poke.getEvolutionById({ id: evolutionChainID });

    // TODO: this should REALLY be somewhere else

    // parse evolution chain into more simplified format 
    const evolutions = [];
    let curr_chain_link = evolution_chain.chain;
    while (curr_chain_link) {
      evolutions.push(curr_chain_link.species.name);
      curr_chain_link = curr_chain_link.evolves_to?.[0];
    }

    const evolution_pokemons = await Promise.all(evolutions.map((evolution) => {
      if (evolution === pokemon.name) return pokemon;
      return serverTrpc.poke.getPokemonByName({ name: evolution });
    }));

    return (
      <DefaultLayout>
        <PokemonDetail pokemon={pokemon} evolution_pokemons={evolution_pokemons} />
      </DefaultLayout>
    );
  } catch {
    notFound();
  }
};