'use client';

import Link from 'next/link';
import { DefaultLayout } from './components/DefaultLayout';
import { trpc } from './_trpc/client';
import { getIdFromUrl } from '~/utils/get-token-from-url';
import { useCallback, useRef, useState } from 'react';

const types = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

export default function HomePage() {
  const scrollObserver = useRef<IntersectionObserver>(null);

  // name inside "search by name" input
  const [searchedName, setSearchedName] = useState('');
  const [searchedType, setSearchedType] = useState('All');

  const pokemonsQuery = trpc.poke.list.useInfiniteQuery(
    {
      limit: 50,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.next == null) return null;
        const nextCursor = getIdFromUrl(lastPage.next, 6);
        return nextCursor.toString();
      },
    },
  );

  const lastElementRef = useCallback(
    (node: HTMLButtonElement) => {
      if (pokemonsQuery.isLoading) return;

      if (scrollObserver.current) scrollObserver.current.disconnect();

      scrollObserver.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          pokemonsQuery.hasNextPage &&
          !pokemonsQuery.isFetching
        ) {
          pokemonsQuery.fetchNextPage();
        }
      });

      if (node) scrollObserver.current.observe(node);
    },
    [pokemonsQuery],
  );

  const pokeIds =
    pokemonsQuery.data?.pages
      .map((page) =>
        page.results.map((pokeRes) => getIdFromUrl(pokeRes.url, 8)),
      )
      .flat() ?? [];
  const pokemons = trpc.useQueries((t) =>
    pokeIds?.map((id) => t.poke.getPokemonById({ id })),
  );

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      (searchedName === '' ||
        pokemon.data?.name.match(new RegExp(searchedName, 'i'))) &&
      (searchedType === 'All' ||
        pokemon.data?.types.some((type) => type.type.name === searchedType)),
  );

  return (
    <DefaultLayout>
      <div className="flex flex-col bg-gray-800 py-8">
        <h1 className="w-full text-center text-4xl font-bold">Pokédex</h1>

        <div className="flex flew-row justify-around">
          <div className="flex flex-col justify-center items-center">
            <p>Search by name</p>
            <input
              name="name_search"
              type="text"
              placeholder="Pikachu"
              defaultValue={searchedName}
              onChange={(e) => setSearchedName(e.target.value)}
              className=" bg-gray-700 border-gray-600 rounded-lg min-w-[200px] px-2"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <p>Search by type</p>
            <select
              defaultValue="All"
              onChange={(e) => setSearchedType(e.target.value)}
              className="bg-gray-700 border-gray-600 rounded-lg px-2"
            >
              <option value="All" defaultChecked>
                All
              </option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,150px)] auto-rows-auto gap-4">
          {filteredPokemons.map(({ data: pokemon }, index) => (
            <div
              key={index + 1}
              className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[150px] h-[200px]"
            >
              <h2 className="max-w-[100%] text-[20px] font-bold capitalize truncate">
                {pokemon?.name}
              </h2>
              {pokemon?.sprites.front_default && (
                <img
                  src={pokemon?.sprites.front_default ?? ''}
                  className="max-w-[80px]"
                />
              )}
              <Link
                href={`/pokemon/${pokemon?.id}`}
                className="mt-2 inline-block text-center rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
              >
                View
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center">
          <button
            className="rounded-md bg-indigo-500 px-4 py-2 mt-6 text-white hover:bg-indigo-600"
            onClick={() => void pokemonsQuery.fetchNextPage()}
            ref={lastElementRef}
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
    </DefaultLayout>
  );
}
