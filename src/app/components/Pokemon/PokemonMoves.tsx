import { serverTrpc } from '~/app/_trpc/server';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { parseUrlAndGetParamInt } from '~/utils/parse-url';

interface PokemonMovesProps {
  pokemonMoves: Pokemon['moves'];
}

export async function PokemonMoves({ pokemonMoves }: PokemonMovesProps) {
  const moves_preprocess = pokemonMoves
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

  return (
    <div className="flex flex-col justify-center mt-4 mb-4">
      <h4 className="w-full text-center text-2xl mb-4">Moves</h4>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Move</th>
            <th>Type</th>
            <th>Category</th>
            <th>Power</th>
            <th>Accuracy</th>
            <th>PP</th>
          </tr>
        </thead>
        <tbody>
          {moves?.map((move) => (
            <tr key={move.id}>
              <th>{move.level}</th>
              <th className="capitalize">{move.name}</th>
              <th>{move.type.name}</th>
              <th>{move.damage_class.name}</th>
              <th>{move.power ? move.power : '-'}</th>
              <th>{move.accuracy ? `${move.accuracy} %` : '-'}</th>
              <th>{move.pp}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
