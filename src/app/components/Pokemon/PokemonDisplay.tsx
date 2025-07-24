'use client';

import { useState } from 'react';
import { PokemonTypeFC } from './PokemonType';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import Image from 'next/image';
import Toggle from 'react-toggle';

interface PokemonDisplayProps {
  name: Pokemon['name'];
  sprites: Pokemon['sprites'];
  types: Pokemon['types'];
}

export function PokemonDisplay({ name, sprites, types }: PokemonDisplayProps) {
  const [isFrontFacing, setIsFrontFacing] = useState(true);
  const [isMale, setIsMale] = useState(true);
  const [isShiny, setIsShiny] = useState(false);

  const sprite_name =
    (isFrontFacing ? 'front' : 'back') +
    (isShiny ? '_shiny' : '') +
    (isMale ? (!isShiny ? '_default' : '') : '_female');

  return (
    <div className="w-[80%] m-auto flex flex-col justify-center items-center">
      {sprites[sprite_name] && (
        <Image
          src={sprites[sprite_name]}
          alt={name}
          width={400}
          height={400}
          priority
          className="w-full max-w-[400px]"
        />
      )}

      <div className="w-[50%] flex flex-row justify-around mb-4">
        {types.map((type) => (
          <PokemonTypeFC key={type.type.url} {...type} />
        ))}
      </div>

      <div className="w-full m-auto flex flex-row mb-4">
        <div className="flex-1 flex justify-center items-center">
          {sprites.front_female != null && (
            <button
              onClick={() => setIsMale((isMale) => !isMale)}
              type="button"
              className="flex gap-x-4 bg-stone-400 rounded-full items-center justify-center"
            >
              <Image src="/male.svg" width={30} height={30} className={`max-h-[30px] m-2 ${isMale && 'border-2 border-gray-300 rounded-full'}`} alt="Male" />
              <Image src="/female.svg" width={30} height={30} className={`max-h-[30px] m-2 ${!isMale && 'border-2 border-gray-300 rounded-full'}`} alt="Female" />
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center">
          {sprites.back_default && (
            <button
              onClick={() =>
                setIsFrontFacing((isFrontFacing) => !isFrontFacing)
              }
              role="button"
              className="bg-stone-400 rounded-full cursor-pointer"
            >
              <Image
                src="/turn.png"
                alt="Turn Pokemon"
                width={50}
                height={50}
                className="w-[50px]"
              />
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center">
          {sprites.front_shiny && (
            <div className="flex flex-col text-center justify-center items-center gap-y-2">
              <h4 className="flex flex-row gap-x-2">
                Shiny{' '}
                <Image src="/shiny.png" alt="Shiny" width={24} height={24} />
              </h4>
              <Toggle onChange={() => setIsShiny((isShiny) => !isShiny)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
