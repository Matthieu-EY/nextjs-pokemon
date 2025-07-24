'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '~/libs/poke/dto/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="flex flex-col justify-center items-center relative rounded-md border border-gray-600 bg-gray-700 p-4 w-[150px] h-[200px]">
      <h2 className="max-w-[100%] text-[20px] font-bold capitalize truncate">
        {pokemon?.name}
      </h2>
      {pokemon?.sprites.front_default && (
        <Image
          src={pokemon?.sprites.front_default ?? ''}
          alt={pokemon.name}
          width={80}
          height={80}
          className="max-w-[80px]"
        />
      )}
      <Link
        href={`/pokemon/${pokemon?.id}`}
        onClick={(e) => e?.stopPropagation()}
        className="mt-2 inline-block text-center rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
      >
        View
      </Link>
    </div>
  );
}
