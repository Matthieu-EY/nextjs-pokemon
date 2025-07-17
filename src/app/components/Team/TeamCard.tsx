import { TeamFull } from './TeamsList';

interface TeamCardProps {
  team: TeamFull;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="flex flex-col justify-center items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[350px] h-[200px]">
      <p>{team.name}</p>
      <div className="mt-4 grid justify-center items-center content-center justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,350px)] auto-rows-auto gap-4">
        {team.pokemons.map((pokemon) => (
          <div>
            <p>{pokemon.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
