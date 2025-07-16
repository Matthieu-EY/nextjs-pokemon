'use client';

import Link from 'next/link';
import type { Pokemon } from '~/libs/poke/dto/pokemon';
import { useRef, useState } from 'react';
import { PokemonTypeFC } from './PokemonType';
import { PokemonInfo } from './PokemonInfo';
import { formatName } from '~/utils/format-str';

interface PokemonProps {
  pokemon: Pokemon;
}

function PokemonDetail({ pokemon }: PokemonProps) {
  const [isFrontFacing, setIsFrontFacing] = useState(true);
  const [isMale, setIsMale] = useState(true);
  const [isShiny, setIsShiny] = useState(false);

  // for playing sounds when user clicks a button
  const soundLatest = useRef<HTMLAudioElement>(null);
  const soundLegacy = useRef<HTMLAudioElement>(null);

  // TODO: this works, but some refactor couldn't hurt here
  const sprite_name =
    (isFrontFacing ? 'front' : 'back') +
    (isShiny ? '_shiny' : '') +
    (isMale ? (!isShiny ? '_default' : '') : '_female');

  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        {pokemon.name}
      </h1>

      <div className="w-[80%] m-auto flex flex-col justify-center items-center">
        <img
          src={pokemon.sprites[sprite_name]!}
          className="w-full max-w-[400px]"
        />

        <div className="w-[50%] flex flex-row justify-around mb-4">
          {pokemon.types.map((type) => (
            <PokemonTypeFC key={type.type.url} {...type} />
          ))}
        </div>

        <div className="w-full m-auto flex flex-row mb-4">
          <div className="flex-1 flex justify-center items-center">
            {pokemon.sprites.front_female != null && (
              <button
                onClick={() => setIsMale((isMale) => !isMale)}
                type="button"
                className="flex p-2 gap-x-4 bg-stone-400 rounded-full items-center justify-center"
              >
                <img src="/male.svg" className="max-h-[30px]" alt="Male" />
                <img src="/female.svg" className="max-h-[30px]" alt="Female" />
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-center items-center">
            {pokemon.sprites.back_default && (
              <button
                onClick={() =>
                  setIsFrontFacing((isFrontFacing) => !isFrontFacing)
                }
                role="button"
                className="bg-stone-400 rounded-full cursor-pointer"
              >
                <img src="/turn.png" className="w-[50px]" />
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-center items-center">
            {pokemon.sprites.front_shiny && (
              <button
                onClick={() => setIsShiny((isShiny) => !isShiny)}
                type="button"
                className="flex p-2 gap-x-4 bg-stone-400 rounded-full items-center justify-center"
              >
                <p>Shiny</p>
                <p>Not shiny</p>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-x-4">
        <PokemonInfo name="Height">
          <p>{`${(pokemon.height / 10).toFixed(1)}m`}</p>
        </PokemonInfo>
        <PokemonInfo name="Weight">
          <p>{`${(pokemon.weight / 10).toFixed(1)}kg`}</p>
        </PokemonInfo>

        <PokemonInfo name="Cries">
          <div className="flex flex-row gap-x-4 px-2">
            {pokemon.cries.latest && (
              <figure className="w-full">
                <figcaption>Latest</figcaption>
                <button
                  onClick={() =>
                    soundLatest.current?.paused
                      ? void soundLatest.current.play()
                      : soundLatest.current?.pause()
                  }
                  className="w-full text-center border border-red"
                >
                  Play
                </button>
                <audio ref={soundLatest} src={pokemon.cries.latest} />
              </figure>
            )}

            {pokemon.cries.legacy && (
              <figure className="w-full">
                <figcaption>Legacy</figcaption>
                <button
                  onClick={() =>
                    soundLegacy.current?.paused
                      ? void soundLegacy.current.play()
                      : soundLegacy.current?.pause()
                  }
                  className="w-full text-center border border-red"
                >
                  Play
                </button>
                <audio ref={soundLegacy} src={pokemon.cries.legacy} />
              </figure>
            )}
          </div>
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
