import Link from 'next/link';
import type { Pokemon } from '~/libs/poke/dto/pokemon';
import { PokemonInfo } from './PokemonInfo';
import { formatName } from '~/utils/format-str';
import { PokemonCries } from './PokemonCries';
import { PokemonDisplay } from './PokemonDisplay';

interface PokemonProps {
  pokemon: Pokemon;
}

function PokemonDetail({ pokemon }: PokemonProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        {pokemon.name}
      </h1>

      <PokemonDisplay 
        sprites={pokemon.sprites}
        types={pokemon.types}
      />

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

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(pokemon, null, 4)}
      </pre>
    </div>
  );
}

export { PokemonDetail };
