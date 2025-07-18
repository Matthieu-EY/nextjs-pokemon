import { PokemonCombat, Team } from '@prisma/client';
import Link from 'next/link';
import { TeamCard } from './TeamCard';
import { Pokemon } from '~/libs/poke/dto/pokemon';

export interface TeamFull extends Omit<Team, 'createdAt' | 'updatedAt'> {
  pokemons: (PokemonCombat & Pokemon)[];
}

interface TeamsListProps {
  teams: TeamFull[];
}

export function TeamsList({ teams }: TeamsListProps) {
  return (
    <div className="flex flex-col justify-start items-start h-full px-8">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-7xl font-bold w-full text-center capitalize mb-4">
        Teams
      </h1>

      <div className='min-w-fit'>
        <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,350px)] auto-rows-auto gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
