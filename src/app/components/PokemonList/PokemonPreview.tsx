import Image from 'next/image';
import { TeamFull } from '../Team/TeamsList';

interface PokemonPreviewProps {
  pokemon: TeamFull['pokemons'][number];
}

export function PokemonPreview({ pokemon }: PokemonPreviewProps) {
  return (
    <div
      className="w-[100px] min-h-[110px] px-2 flex flex-col justify-center items-center border border-gray-50 rounded-md bg-gray-600"
    >
      {pokemon.idPokemon !== -1 && (
        <>
          <p className="capitalize">{pokemon.name}</p>
          <Image
            src={pokemon.sprites.front_default!}
            alt={`Sprite of ${pokemon.name}`}
            width={80}
            height={80}
            className="w-[80px]"
          />
        </>
      )}
    </div>
  );
}
