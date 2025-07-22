'use client';

import { useContext } from 'react';
import { teamContext } from '../Provider/Provider';
import { PokemonPreview } from '../PokemonList/PokemonPreview';
import { TeamFull } from './TeamsList';

export function TeamBanner() {
  const { team } = useContext(teamContext);

  if (team == null) return null;

  const teamPokemons = team.pokemons
    .concat(
      Array(team.size - team.pokemons.length)
        .fill({
          idPokemon: -1,
        })
        .map((poke: TeamFull['pokemons'][number]) => {
          return {
            ...poke,
            id: poke.id ?? crypto.randomUUID(),
          };
        }),
    )
    .slice(0, team.size);

  return (
    <aside className="fixed min-w-fit w-[55%] left-[50%] -translate-x-[50%] flex flex-col justify-start items-center min-h-[100px] bottom-0 bg-gray-600 border border-gray-500 rounded-lg">
      <h2 className="relative top-2">{team.name}</h2>
      <p className="absolute top-2 left-4">Editing team</p>
      <div className="flex flex-row mt-4 mb-2 gap-x-4">
        {teamPokemons.map((pokemon) => (
          <PokemonPreview key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </aside>
  );
}
