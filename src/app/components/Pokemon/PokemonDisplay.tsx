'use client';

import { useState } from 'react';
import { PokemonTypeFC } from './PokemonType';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import Image from 'next/image';

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
      <Image
        src={sprites[sprite_name]!}
        alt={name}
        className="w-full max-w-[400px]"
      />

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
              className="flex p-2 gap-x-4 bg-stone-400 rounded-full items-center justify-center"
            >
              <Image src="/male.svg" className="max-h-[30px]" alt="Male" />
              <Image src="/female.svg" className="max-h-[30px]" alt="Female" />
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
              <Image src="/turn.png" alt='Turn Pokemon' className="w-[50px]" />
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center">
          {sprites.front_shiny && (
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
  );
}
