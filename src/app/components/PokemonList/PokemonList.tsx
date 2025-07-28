'use client';

import { MouseEvent, useContext } from 'react';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { teamContext } from '../Provider/Provider';
import { PokemonCard } from './PokemonCard';
import { addPokemonToTeam, deletePokemonFromTeam } from '~/server/actions';

interface PokemonListProps {
  pokemons: Pokemon[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  const { team, setTeam } = useContext(teamContext);

  const addPokemon = async (pokemon: Pokemon) => {
    if (team == null) return;
    await addPokemonToTeam(pokemon.id, team.id);
    setTeam({
      ...team,
      pokemons: [
        ...team.pokemons,
        {
          ...pokemon,
          idPokemon: pokemon.id,
          teamId: team.id,
          id: Math.floor(Math.random() * 1000) + 20000,
        },
      ],
    });
  };

  const deletePokemon = async (pokemon: Pokemon) => {
    if (team == null) return;
    await deletePokemonFromTeam(pokemon.id, team.id);
    setTeam({
      ...team,
      pokemons: team.pokemons.filter(
        (poke) => poke.teamId !== team.id || poke.idPokemon !== pokemon.id,
      ),
    });
  };

  const togglePokemon = async (
    e: MouseEvent<unknown>,
    pokemon: Pokemon,
  ) => {
    e.stopPropagation();
    if (team == null) return;
    if (team.pokemons.find((poke) => poke.idPokemon === pokemon.id)) {
      await deletePokemon(pokemon);
    } else {
      await addPokemon(pokemon);
    }
  };

  return (
    <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,150px)] auto-rows-auto gap-4">
      {pokemons.map((pokemon) =>
        team == null ? (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ) : (
          <button
            key={pokemon.id}
            onClick={(e) => void togglePokemon(e, pokemon)}
            className={`cursor-pointer hover:border-gray-300 hover:border rounded-lg ${team.pokemons.find((poke) => poke.idPokemon === pokemon.id) != null && 'border-gray-200 border'}`}
          >
            <PokemonCard pokemon={pokemon} />
          </button>
        ),
      )}
    </div>
  );
}
