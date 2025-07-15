import { notFound } from 'next/navigation';
import { DefaultLayout } from '../../components/DefaultLayout';
import { serverTrpc } from '~/app/_trpc/server';
import { PokemonDetail } from '~/app/components/Pokemon/Pokemon';

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;

  const id = parseInt(idParam, 10);

  try {
    const pokemon = await serverTrpc.poke.getPokemonById({ id });

    /*
    const speciesId = parseInt(getTokenFromUrl(pokemon.species.url, 30), 10);
    const species = await serverTrpc.poke.getSpeciesById({ id: speciesId });
    */

    return (
      <DefaultLayout>
        <PokemonDetail pokemon={pokemon} />
      </DefaultLayout>
    );
  } catch {
    notFound();
  }
};