'use client';

import Link from 'next/link';
import type { Pokemon, PokemonSprites, PokemonType } from '~/libs/poke/dto/pokemon';
import { useState } from 'react';

interface PokemonProps {
  pokemon: Pokemon
}

function PokemonRN({ pokemon }: PokemonProps) {
  const [isFrontFacing, setIsFrontFacing] = useState(true);

  const sprite_name = (isFrontFacing ? "front" : "back") + "_default";

  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize">{pokemon.name}</h1>

        <div className='w-[80%] m-auto flex flex-col justify-center items-center'>
          <img src={pokemon.sprites[sprite_name]} className='w-full max-w-[400px]' />
          

          <button onClick={() => setIsFrontFacing((isFrontFacing) => !isFrontFacing)} role='button' className='cursor-pointer'>
            <img src="/turn.png" className='w-[50px]' />
          </button>
          
          <div className='w-[50%] flex flex-row justify-around'>
            {pokemon.types.map((type) => (
              <p key={type.type.url}>{type.type.name}</p>
            ))}
          </div>
        </div>
      

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(pokemon, null, 4)}
      </pre>
    </div>
  );
};

export {
  PokemonRN,
};