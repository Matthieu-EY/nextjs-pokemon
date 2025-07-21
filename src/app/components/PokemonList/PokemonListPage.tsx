'use client';

import { trpc } from '~/app/_trpc/client';
import { useScrollRef } from '~/app/hooks/useScrollRef';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { PokemonCard } from './PokemonCard';
import { useState } from 'react';
import { throttle } from '~/utils/ratelimit';
import { ExternalResource, PokePaginatedResponse, Type } from '~/libs/poke/dto/common';
import { PokemonSearch } from './PokemonSearch';
import { PokemonListType } from './PokemonListType';
import { parseUrlAndGetParam } from '~/utils/get-token-from-url';

const FETCH_LIMIT_POKEMONS = 50;

interface PokemonListProps {
  initialPokemonList: PokePaginatedResponse<ExternalResource>
  initialPokemonDetails: Record<string, Pokemon>;
}

export function PokemonListPage({ initialPokemonList, initialPokemonDetails }: PokemonListProps) {
  // name inside "search by name" input
  const [searchedName, setSearchedName] = useState('');
  const [searchedType, setSearchedType] = useState<Type | 'All'>('All');

  const pokemonsQuery = trpc.poke.list.useInfiniteQuery(
    {
      limit: FETCH_LIMIT_POKEMONS,
    },
    {
      initialData: {
        pageParams: [],
        pages: [initialPokemonList]
      },
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

  const observedRef = useScrollRef(throttle(() => void onScroll(), 800));

  const pokeIds =
    pokemonsQuery.data?.pages
      .map((page) =>
        page.results.map((pokeRes) =>
          parseInt(parseUrlAndGetParam(pokeRes.url) ?? '', 10),
        ),
      )
      .flat() ?? [];
  const pokemonsTrpc = trpc.useQueries((t) =>
    pokeIds.map((id) => t.poke.getPokemonById({ id }, { initialData: initialPokemonDetails[id] })),
  );

  const filteredPokemons = pokemonsTrpc.map((poke) => poke.data).filter(
    (pokemon: Pokemon | undefined): pokemon is Pokemon =>
      pokemon != undefined &&
      (searchedName === '' ||
        new RegExp(searchedName, 'i').exec(pokemon?.name) != null)
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
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
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