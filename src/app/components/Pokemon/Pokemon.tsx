import Link from 'next/link';
import type { Pokemon } from '~/libs/poke/dto/pokemon';
import { PokemonInfo } from './PokemonInfo';
import { formatName } from '~/utils/format-str';
import { PokemonCries } from './PokemonCries';
import { PokemonDisplay } from './PokemonDisplay';
import { PokemonMove } from '~/libs/poke/dto/move';

interface PokemonProps {
  pokemon: Pokemon;
  evolution_pokemons?: Pokemon[];
  moves?: PokemonMove[];
}

function PokemonDetail({ pokemon, evolution_pokemons, moves }: PokemonProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
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

      <div className='flex flex-col justify-center mt-8 mb-4'>
        <h4 className='w-full text-center text-2xl'>Evolution</h4>
        <div className='flex flex-row justify-around items-center px-16'>
            {evolution_pokemons?.map((evol_pokemon) => (
              <Link href={`/pokemon/${evol_pokemon.id}`} key={evol_pokemon.id} className='flex flex-col justify-center items-center'>
                <img src={evol_pokemon.sprites.front_default!} className={`min-w-[${evol_pokemon.name === pokemon.name ? 200 : 100}px] min-h-[${evol_pokemon.name === pokemon.name ? 200 : 100}px]`}/>
                <p className={`text-xl capitalize ${evol_pokemon.name === pokemon.name && 'underline'}`}>{evol_pokemon.name}</p>
              </Link>
            ))}
        </div>
      </div>

      <div className='flex flex-col justify-center mt-4 mb-4'>
        <h4 className='w-full text-center text-2xl mb-4'>Moves</h4>
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
                <th className='capitalize'>{move.name}</th>
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

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(pokemon, null, 4)}
      </pre>
    </div>
  );
}

export { PokemonDetail };
