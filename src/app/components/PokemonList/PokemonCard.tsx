'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { trpc } from '~/app/_trpc/client';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { teamContext } from '../Provider/Provider';
import { invalidateCacheTag } from '~/server/actions';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { team, setTeam } = useContext(teamContext);

  const addMutation = trpc.pokeCombat.add.useMutation();
  const deleteMutation = trpc.pokeCombat.deletePokemonInTeam.useMutation();

  const addPokemon = async (idPokemon: number) => {
    if (team == null) return;
    addMutation.mutate({ idPokemon: idPokemon, idTeam: team.id });
    setTeam({
      ...team,
      pokemons: [
        ...team.pokemons,
        {
          ...pokemon,
          idPokemon: idPokemon,
          teamId: team.id,
          id: Math.floor(Math.random() * 1000) + 20000
        },
      ],
    });
    await invalidateCacheTag('teamList');
  };

  const deletePokemon = async (idPokemon: number) => {
    if (team == null) return;
    deleteMutation.mutate({ idPokemon: idPokemon, idTeam: team.id });
    setTeam({
      ...team,
      pokemons: team.pokemons.filter((poke) => poke.teamId !== team.id || poke.idPokemon !== idPokemon),
    })
    await invalidateCacheTag('teamList');
  };

  return (
    <div className="flex flex-col justify-center items-center relative rounded-md border border-gray-600 bg-gray-700 p-4 w-[150px] h-[200px]">
      {team != null && (
        <>
          <button
            onClick={() => void addPokemon(pokemon.id)}
            className="absolute bottom-1 left-1"
          >
            <span className="block min-w-[24px] rounded-[50%] bg-green-600 text-center">
              +
            </span>
          </button>
          <button
            onClick={() => void deletePokemon(pokemon.id)}
            className="absolute bottom-1 right-1"
          >
            <span className="block min-w-[24px] rounded-[50%] bg-red-600 text-center">
              -
            </span>
          </button>
        </>
      )}

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
        className="mt-2 inline-block text-center rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
      >
        View
      </Link>
    </div>
  );
}
