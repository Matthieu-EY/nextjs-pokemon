'use client';

import { Type } from "~/libs/poke/dto/common";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearch } from "./PokemonSearch";
import { trpc } from "~/app/_trpc/client";
import { parseUrlAndGetParam } from '../../../utils/get-token-from-url';
import { Pokemon } from "~/libs/poke/dto/pokemon";

interface PokemonListTypeProps {
  searchedName: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
  searchedType: Type | "All";
  setSearchedType: React.Dispatch<React.SetStateAction<Type | "All">>;
}

export function PokemonListType({ searchedName, setSearchedName, searchedType, setSearchedType }: PokemonListTypeProps) {

  const typeData = trpc.poke.getTypeByName.useQuery({ name: searchedType });
  const pokemonIds = typeData.data?.pokemon.map((poke) => parseUrlAndGetParam(poke.pokemon.url)).filter((id) => id != undefined) ?? [];
  
  const pokemons = trpc.useQueries((t) => 
    pokemonIds?.map((id) => t.poke.getPokemonById({ id: parseInt(id, 10) }))
  ).map((poke) => poke.data);

  
  const filteredPokemons = pokemons.filter(
    (pokemon: Pokemon | undefined): pokemon is Pokemon =>
      pokemon != undefined &&
      (searchedName === '' ||
        new RegExp(searchedName, 'i').exec(pokemon?.name) != null) &&
      (searchedType === 'All' ||
        pokemon?.types.some((type) => type.type.name === searchedType)),
  );

  return (
    <div className="flex flex-col bg-gray-800 py-8">
        <h1 className="w-full text-center text-4xl font-bold">Pokédex</h1>

        <PokemonSearch 
          searchedName={searchedName}
          setSearchedName={setSearchedName}
          searchedType={searchedType}
          setSearchedType={setSearchedType}
        />

        <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,150px)] auto-rows-auto gap-4">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index + 1} pokemon={pokemon} />
          ))}
        </div>
      </div>
  )
}