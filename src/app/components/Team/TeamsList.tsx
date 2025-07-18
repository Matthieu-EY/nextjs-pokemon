import { PokemonCombat, Team } from '@prisma/client';
import Link from 'next/link';
import { TeamCard } from './TeamCard';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { TeamModal } from './TeamModal';

export interface TeamFull extends Omit<Team, 'createdAt' | 'updatedAt'> {
  pokemons: (PokemonCombat & Pokemon)[];
}

interface TeamsListProps {
  teams: TeamFull[];
  team_modal_shown?: boolean;
}

export function TeamsList({ teams, team_modal_shown }: TeamsListProps) {
  return (
    <div className="flex flex-col justify-start items-start h-full px-8">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        Teams
      </h1>

      <div className="w-full">
        <div className="mt-4 flex-row grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,400px)] auto-rows-auto gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
          <Link href="/teams?team_modal=true">
            <div className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[400px] min-h-[310px]">
              <p className="text-8xl">+</p>
            </div>
          </Link>
        </div>
      </div>

      {team_modal_shown && (
        <TeamModal />
      )}
    </div>
  );
}
