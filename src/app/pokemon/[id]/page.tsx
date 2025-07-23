import { notFound } from 'next/navigation';
import { DefaultLayout } from '../../components/DefaultLayout';
import { serverTrpc } from '~/app/_trpc/server';
import { PokemonDetail } from '~/app/components/Pokemon/Pokemon';
import { parseUrlAndGetParamInt } from '~/utils/parse-url';
import { nestedObjToArray } from '~/utils/iterate';
import { PokemonEvolutionChain } from '~/libs/poke/dto/evolution';

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;

  const id = parseInt(idParam, 10);

  try {
    const pokemon = await serverTrpc.poke.getPokemonById({ id });

    const speciesId = parseUrlAndGetParamInt(pokemon.species.url);
    const species = await serverTrpc.poke.getSpeciesById({ id: speciesId });

    const evolutionChainID = parseUrlAndGetParamInt(
      species.evolution_chain.url,
    );
    const evolution_chain = await serverTrpc.poke.getEvolutionById({
      id: evolutionChainID,
    });

    const moves_preprocess = pokemon.moves
      .filter((move) => move.version_group_details[0].level_learned_at > 0)
      .sort(
        (move1, move2) =>
          move1.version_group_details[0].level_learned_at -
          move2.version_group_details[0].level_learned_at,
      )
      .map((move) => {
        return {
          id: parseUrlAndGetParamInt(move.move.url),
          level: move.version_group_details[0].level_learned_at,
        };
      });

    const moves = await Promise.all(
      moves_preprocess.map(async (move_preprocess) => {
        const move = await serverTrpc.poke.getMoveById({
          id: move_preprocess.id,
        });
        return {
          ...move,
          level: move_preprocess.level,
        };
      }),
    );

    // parse evolution chain into more simplified format
    const evolutions = nestedObjToArray<PokemonEvolutionChain['chain'], string>(
      evolution_chain.chain,
      (chain) => chain.evolves_to?.[0],
      (chain) => chain.species.name,
    );

    const evolution_pokemons = await Promise.all(
      evolutions.map((evolution) => {
        if (evolution === pokemon.name) return pokemon;
        return serverTrpc.poke.getPokemonByName({ name: evolution });
      }),
    );

    return (
      <DefaultLayout>
        <PokemonDetail
          pokemon={pokemon}
          evolution_pokemons={evolution_pokemons}
          moves={moves}
        />
      </DefaultLayout>
    );
  } catch {
    notFound();
  }
}
