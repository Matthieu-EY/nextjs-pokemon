"use client";

import { PokemonCombat, Team } from '@prisma/client';
import Link from 'next/link';
import { TeamCard } from './TeamCard';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { TeamModal } from './TeamModal';
import { useOptimistic, useState } from 'react';
import { addTeam } from '~/server/actions';

export interface TeamFull extends Omit<Team, 'createdAt' | 'updatedAt'> {
  pokemons: (PokemonCombat & Pokemon)[];
}

interface TeamsListProps {
  initTeams: TeamFull[];
  team_modal_shown?: boolean;
}

export function TeamsList({ initTeams, team_modal_shown }: TeamsListProps) {
  const [teams, setTeams] = useState<TeamFull[]>(initTeams);
  const [teamModalShown, setTeamModalShown] = useState<boolean>(team_modal_shown ?? false);
  const [optimisticTeams, addOptimisticTeam] = useOptimistic(teams, (state, newTeam: TeamFull) => {
    return [...state, newTeam];
  });

  async function onTeamAdd(previousState: unknown, formData: FormData) {
    setTeamModalShown(false);
    const name = formData.get("name") as string;
    const dummyTeam = { id: Math.random() * 100 + 5000, name: name, size: 6, pokemons: [] };
    addOptimisticTeam(dummyTeam);
    const newTeam = await addTeam(name);
    const newTeamFull: TeamFull = {
      ...newTeam,
      pokemons: [],
    }
    setTeams([...teams, newTeamFull]);
    return newTeam.name ?? "";
  }

  return (
    <div className="flex flex-col justify-start items-start h-full px-8">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        Teams
      </h1>

      <div className="w-full">
        <div className="my-4 flex-row grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,400px)] auto-rows-auto gap-4">
          {optimisticTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
          <button onClick={() => setTeamModalShown(true)}>
            <div className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[400px] min-h-[310px]">
              <p className="text-8xl">+</p>
            </div>
          </button>
        </div>
      </div>

      {teamModalShown && <TeamModal onTeamAdd={onTeamAdd} onModalClose={() => setTeamModalShown(false)}  />}
    </div>
  );
}
