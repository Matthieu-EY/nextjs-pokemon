'use client';

import { PokemonCombat, Team } from '@prisma/client';
import Link from 'next/link';
import { TeamCard } from './TeamCard';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { TeamModal } from './TeamModal';
import { useContext, useOptimistic, useState, useTransition } from 'react';
import { addTeam, invalidateCacheTag } from '~/server/actions';
import { teamContext } from '../Provider/Provider';

export interface TeamFull extends Omit<Team, 'createdAt' | 'updatedAt'> {
  pokemons: (PokemonCombat & Pokemon)[];
}

interface TeamsListProps {
  initTeams: TeamFull[];
  team_modal_shown?: boolean;
}

export function TeamsList({ initTeams, team_modal_shown }: TeamsListProps) {
  const [teamModalShown, setTeamModalShown] = useState<boolean>(
    team_modal_shown ?? false,
  );
  const [optimisticTeams, addOptimisticTeam] = useOptimistic(
    initTeams,
    (state, newTeam: TeamFull) => {
      return [...state, newTeam];
    },
  );

  const [_, startTransition] = useTransition();

  const { setTeam } = useContext(teamContext);

  function onTeamAdd(previousState: unknown, formData: FormData) {
    const name = formData.get('name') as string;

    startTransition(async () => {
      setTeamModalShown(false);
      const dummyTeam = {
        id: Math.random() * 100 + 5000,
        name: name,
        size: 6,
        pokemons: [],
      };
      addOptimisticTeam(dummyTeam);
      await addTeam(name);
      await invalidateCacheTag('teamList');
    });
    return name ?? '';
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
            <button
              onClick={() => setTeam(team)}
              key={team.id}
              role="button"
              className="cursor-pointer"
            >
              <TeamCard team={team} />
            </button>
          ))}
          <button onClick={() => setTeamModalShown(true)} role='button' className='cursor-pointer'>
            <div className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[400px] min-h-[310px]">
              <p className="text-8xl">+</p>
            </div>
          </button>
        </div>
      </div>

      <TeamModal
        modalShown={teamModalShown}
        onTeamAdd={onTeamAdd}
        onModalClose={() => setTeamModalShown(false)}
      />
    </div>
  );
}
