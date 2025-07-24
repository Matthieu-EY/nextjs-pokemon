import { PokemonPreview } from '../PokemonList/PokemonPreview';
import { TeamFull } from './TeamsList';

interface TeamCardProps {
  team: TeamFull;
}

export function TeamCard({ team }: TeamCardProps) {
  // if less pokemons than team.size, then pad the array with dummy objects
  // this is used to render empty squares, as in the Pokémon UI
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

  return (
    <div className="flex flex-col justify-start items-center rounded-md border border-gray-600 bg-gray-700 p-4 w-[400px] min-h-[300px]">
      <p>{team.name}</p>
      <div className="w-full min-h-[150px] mt-4 grid justify-center items-center content-start justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,100px)] auto-rows-auto gap-4">
        {teamPokemons.map((pokemon) => (
          <PokemonPreview key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
