import { notFound } from 'next/navigation';
import { DefaultLayout } from '../../components/DefaultLayout';
import { serverTrpc } from '~/app/_trpc/server';
import { PokemonDetail } from '~/app/components/Pokemon/Pokemon';

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;

  const id = parseInt(idParam, 10);

  try {
    const pokemon = await serverTrpc.poke.getPokemonById({ id });

    return (
      <DefaultLayout>
        <PokemonDetail pokemon={pokemon} />
      </DefaultLayout>
    );
  } catch {
    notFound();
  }
}
