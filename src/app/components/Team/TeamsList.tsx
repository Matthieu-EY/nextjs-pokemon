import { PokemonCombat, Prisma, Team } from "@prisma/client";
import Link from "next/link";

interface TeamFull extends Team {
  pokemons: PokemonCombat[];
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

        <div>
          <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,150px)] auto-rows-auto gap-4">
            {teams.map((team) => (
              <div 
                key={team.id} 
                className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[150px] h-[200px]">
                  <p>{team.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};