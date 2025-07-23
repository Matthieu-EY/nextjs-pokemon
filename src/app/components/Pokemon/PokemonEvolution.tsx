import Image from 'next/image';
import Link from 'next/link';
import { serverTrpc } from '~/app/_trpc/server';
import { PokemonEvolutionChain } from '~/libs/poke/dto/evolution';
import { Pokemon } from '~/libs/poke/dto/pokemon';
import { nestedObjToArray } from '~/utils/iterate';
import { parseUrlAndGetParamInt } from '~/utils/parse-url';

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

export async function PokemonEvolution({ pokemon }: PokemonEvolutionProps) {
  const speciesId = parseUrlAndGetParamInt(pokemon.species.url);
  const species = await serverTrpc.poke.getSpeciesById({ id: speciesId });

  const evolutionChainID = parseUrlAndGetParamInt(species.evolution_chain.url);
  const evolution_chain = await serverTrpc.poke.getEvolutionById({
    id: evolutionChainID,
  });

  // parse evolution chain into more simplified format
  const evolutions = nestedObjToArray<PokemonEvolutionChain['chain'], string>(
    evolution_chain.chain,
    (chain) => chain.evolves_to?.[0],
    (chain) => chain.species.name,
  );

  const evolution_pokemons = await Promise.all(
    evolutions.map((evolution) => {
      if (evolution === pokemon.name) return pokemon;
      return serverTrpc.poke.getPokemonByName({ name: evolution });
    }),
  );

  return (
    <div className="flex flex-col justify-center mt-8 mb-4">
      <h4 className="w-full text-center text-2xl">Evolution</h4>
      <div className="flex flex-row justify-around items-center px-16">
        {evolution_pokemons?.map((evol_pokemon) => (
          <Link
            href={`/pokemon/${evol_pokemon.id}`}
            key={evol_pokemon.id}
            className="flex flex-col justify-center items-center"
          >
            <Image
              src={evol_pokemon.sprites.front_default!}
              alt={`Sprite of ${evol_pokemon.name}`}
              width={evol_pokemon.name === pokemon.name ? 200 : 100}
              height={evol_pokemon.name === pokemon.name ? 200 : 100}
            />
            <p
              className={`text-xl capitalize ${evol_pokemon.name === pokemon.name && 'underline'}`}
            >
              {evol_pokemon.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
