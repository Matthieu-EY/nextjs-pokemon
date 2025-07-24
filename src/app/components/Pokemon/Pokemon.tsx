import Link from 'next/link';
import type { Pokemon } from '~/libs/poke/dto/pokemon';
import { PokemonInfo } from './PokemonInfo';
import { formatName } from '~/utils/format-str';
import { PokemonCries } from './PokemonCries';
import { PokemonDisplay } from './PokemonDisplay';
import { Suspense } from 'react';
import { Loading } from '../Loader';
import { PokemonEvolution } from './PokemonEvolution';
import { PokemonMoves } from './PokemonMoves';

interface PokemonProps {
  pokemon: Pokemon;
}

function PokemonDetail({ pokemon }: PokemonProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 pb-4">
      <Link className="text-gray-300 w-full text-center underline mt-4 mb-4" href="/pokemon">
        Back
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        {pokemon.name}
      </h1>

      <PokemonDisplay {...pokemon} />

      <div className="flex flex-row justify-center gap-x-4">
        <PokemonInfo name="Height">
          <p>{`${(pokemon.height / 10).toFixed(1)}m`}</p>
        </PokemonInfo>
        <PokemonInfo name="Weight">
          <p>{`${(pokemon.weight / 10).toFixed(1)}kg`}</p>
        </PokemonInfo>

        <PokemonInfo name="Cries">
          <PokemonCries {...pokemon.cries} />
        </PokemonInfo>

        <PokemonInfo name="Abilities">
          <div className="flex flex-row gap-x-4 px-2">
            <div>
              <p>Ability</p>
              <p>
                {pokemon.abilities
                  .filter((ability) => !ability.is_hidden)
                  .map((ability) => formatName(ability.ability.name))
                  .join(' or ')}
              </p>
            </div>
            {pokemon.abilities.find((ability) => ability.is_hidden) !=
              undefined && (
              <div>
                <p>Hidden ability</p>
                <p>
                  {formatName(
                    pokemon.abilities.find((ability) => ability.is_hidden)
                      ?.ability.name ?? '',
                  )}
                </p>
              </div>
            )}
          </div>
        </PokemonInfo>
      </div>

      <Suspense fallback={<Loading />}>
        <PokemonEvolution pokemon={pokemon} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <PokemonMoves pokemonMoves={pokemon.moves} />
      </Suspense>
    </div>
  );
}

export { PokemonDetail };
