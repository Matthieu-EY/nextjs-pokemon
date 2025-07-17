'use client';

import { trpc } from "~/app/_trpc/client";
import { useScrollRef } from "~/app/hooks/useScrollRef";
import { Pokemon } from "~/libs/poke/dto/pokemon";
import { parseUrlAndGetParam } from "~/utils/get-token-from-url";
import { PokemonCard } from "./PokemonCard";
import { useState } from "react";
import { throttle } from "~/utils/ratelimit";
import { Type } from "~/libs/poke/dto/common";
import { PokemonSearch } from "./PokemonSearch";
import { PokemonListType } from "./PokemonListType";

const FETCH_LIMIT_POKEMONS = 50;

interface PokemonListProps {
  initialPokemons?: Pokemon[];
}

export function PokemonListPage({ initialPokemons = [] }: PokemonListProps) {
  // name inside "search by name" input
  const [searchedName, setSearchedName] = useState('');
  const [searchedType, setSearchedType] = useState<Type | 'All'>('All');

  const pokemonsQuery = trpc.poke.list.useInfiniteQuery(
    {
      limit: FETCH_LIMIT_POKEMONS,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.next == null) return null;
        const nextCursor = parseUrlAndGetParam(lastPage.next, 'offset');
        return nextCursor;
      },
    },
  );

  const onScroll = async () => {
    if (!pokemonsQuery.isLoading && pokemonsQuery.hasNextPage && !pokemonsQuery.isFetching) {
      await pokemonsQuery.fetchNextPage();
    }
  };

  const observedRef = useScrollRef(throttle(() => onScroll(), 800));

  const pokeIds =
    pokemonsQuery.data?.pages
      .map((page) =>
        page.results.map((pokeRes) =>
          parseInt(parseUrlAndGetParam(pokeRes.url) ?? '', 10),
        ),
      )
      .flat() ?? [];
  const pokemonsTrpc = trpc.useQueries(
    (t) => pokeIds.map((id) => t.poke.getPokemonById({ id })),
  );

  const queryNotFinished = pokemonsQuery?.data?.pages?.[0]?.results == undefined;
  const PokemonDetailsNotAllFetchedForFirstRender = pokemonsQuery?.data?.pages.length === 1 && pokemonsTrpc.some((pokemonTrpc) => pokemonTrpc.status === "pending");
  // if first render, load initialPokemons
  // When useInfiniteQuery catches up, replace the initialPokemons with the new ones.
  const pokemons = queryNotFinished || PokemonDetailsNotAllFetchedForFirstRender ? initialPokemons : 
    pokemonsTrpc.map((poke) => poke.data).filter((poke) => poke != null);

  const filteredPokemons = pokemons.filter(
    (pokemon: Pokemon | undefined): pokemon is Pokemon =>
      pokemon != undefined &&
      (searchedName === '' ||
        new RegExp(searchedName, 'i').exec(pokemon?.name) != null) &&
      (searchedType === 'All' ||
        pokemon?.types.some((type) => type.type.name === searchedType)),
  );

  if (searchedType !== "All") {
    return (<PokemonListType searchedName={searchedName} setSearchedName={setSearchedName} searchedType={searchedType} setSearchedType={setSearchedType} />)
  }

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

        <div className="w-full flex justify-center">
          <button
            className="rounded-md bg-indigo-500 px-4 py-2 mt-6 text-white hover:bg-indigo-600"
            onClick={() => void pokemonsQuery.fetchNextPage()}
            ref={observedRef}
            disabled={
              !pokemonsQuery.hasNextPage || pokemonsQuery.isFetchingNextPage
            }
          >
            {pokemonsQuery.isFetchingNextPage
              ? 'Loading more...'
              : pokemonsQuery.hasNextPage
                ? 'Load more'
                : 'No more pokémon'}
          </button>
        </div>
      </div>
  )
}