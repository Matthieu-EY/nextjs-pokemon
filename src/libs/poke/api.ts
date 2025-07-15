/**
 * Poke API Implementation
 */
import { fetchPOKE } from ".";
import { Pokemon, PokemonSpecies } from "./dto/pokemon";

/**
 * API Methods
 */
export const pokemonApi = {
    /**
     * List Pokemons
     * @param offset The offset by which to begin the list
     * @param limit The limit of items to return
     * @returns A list of pokemon (name and url only, to get full details on each pokemon, getByID is necessary)
     */
    listPokemon: (offset: number, limit: number) =>
        fetchPOKE<Pokemon[]>({
            path: `/api/v2/pokemon?offset=${offset}&limit=${limit}`,
        }),


    /**
     * Get Pokemon By ID
     * @param id Id of the pokemon
     * @returns The Pokemon
     */
    getPokeById: (id: number) => 
        fetchPOKE<Pokemon>({
            path: `/api/v2/pokemon/${id}`,
        }),
};

export const speciesApi = {
    /**
     * Get Pokemon Species By ID
     * @param id Id of the species
     * @returns The species: type, 
     */
    getSpeciesById: (id: number) => 
        fetchPOKE<PokemonSpecies>({
            path: `/api/v2/pokemon-species/${id}`,
        }),
};

const pokeApi = {
    pokemon: pokemonApi,
    species: speciesApi,
}

export default pokeApi;