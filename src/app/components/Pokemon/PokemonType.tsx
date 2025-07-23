import Image from 'next/image';
import { Indexable } from '~/libs/poke/dto/common';
import { PokemonTypeExternal } from '~/libs/poke/dto/pokemon';

const colors: Indexable<string> = {
  normal: '#9FA19F',
  fighting: '#FF8000',
  flying: '#81B9EF',
  poison: '#9141CB',
  ground: '#915121',
  rock: '#AFA981',
  bug: '#91A119',
  ghost: '#704170',
  steel: '#60A1B8',
  fire: '#E62829',
  water: '#2980EF',
  grass: '#3FA129',
  electric: '#FAC000',
  psychic: '#EF4179',
  ice: '#3DCEF3',
  dragon: '#5060E1',
  dark: '#624D4E',
  fairy: '#EF70EF',
};

// FC to discriminate with the Type PokemonType
export function PokemonTypeFC({ type }: PokemonTypeExternal) {
  return (
    <div
      className="bg-[#5A5A5A] rounded-xl flex flex-row justify-center items-center gap-x-[12px] p-1"
      style={{
        backgroundImage: `linear-gradient(105deg,${colors[type.name]} 42px,#5A5A5A 31px,#5A5A5A)`,
      }}
    >
      <Image
        src={`/types/${type.name}.png`}
        alt={type.name}
        width={30}
        height={30}
        className="max-w-[30px]"
      />
      <p className="text-xl capitalize font-nowrap">{type.name}</p>
    </div>
  );
}
