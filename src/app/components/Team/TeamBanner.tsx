'use client';

import { useContext } from 'react';
import { teamContext } from '../Provider/Provider';
import { PokemonPreview } from '../PokemonList/PokemonPreview';
import { TeamFull } from './TeamsList';
import { deleteTeam as deleteTeamServer } from '~/server/actions';

export function TeamBanner() {
  const { team, setTeam } = useContext(teamContext);

  if (team == null) return null;

  // fill team.pokemons with dummy content to be able to render empty squares
  const teamPokemons = (
    team.pokemons.length < team.size
      ? team.pokemons.concat(
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
      : team.pokemons
  ).slice(0, team.size);

  const deleteTeam = async (id: number) => {
    setTeam(null);
    await deleteTeamServer(id);
    // TODO: cache still shown
    // find a way to clear the cache
  };

  return (
    <aside className="fixed min-w-fit w-[55%] left-[50%] -translate-x-[50%] flex flex-row justify-center items-start min-h-[100px] bottom-0 bg-gray-600 border border-gray-500 rounded-lg">
      <button
        onClick={() => setTeam(null)}
        role="button"
        type="button"
        className="cursor-pointer"
      >
        <h2 className="relative top-2">{team.name}</h2>
        <p className="absolute top-2 left-4">Editing team</p>
        <div className="flex flex-row mt-4 mb-2 gap-x-4">
          {teamPokemons.map((pokemon) => (
            <PokemonPreview key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </button>
      <button
        onClick={() => void deleteTeam(team.id)}
        className="absolute top-1 right-1"
      >
        <span className="block min-w-[24px] rounded-[50%] bg-red-600 text-center">
          -
        </span>
      </button>
    </aside>
  );
}
