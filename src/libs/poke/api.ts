/**
 * Poke API Implementation
 */
import { fetchPoke } from '.';
import { ExternalResource, PokePaginatedResponse } from './dto/common';
import { Pokemon, PokemonSpecies, PokemonType } from './dto/pokemon';

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
    fetchPoke<PokePaginatedResponse<ExternalResource>>(
      `/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    ),

  /**
   * Get Pokemon By ID
   * @param id Id of the pokemon
   * @returns The Pokemon
   */
  getPokeById: (id: number) => fetchPoke<Pokemon>(`/api/v2/pokemon/${id}`),
};

export const speciesApi = {
  /**
   * Get Pokemon Species By ID
   * @param id Id of the species
   * @returns The species: information about this particular species of pokemon: type, forms, ...
   */
  getSpeciesById: (id: number) => fetchPoke<PokemonSpecies>(`/api/v2/pokemon-species/${id}`),
};

export const typeApi = {
  /**
   * Get type by ID
   * @param id Id of the type
   * @returns The type: normal, fighting, ...
   */
  getTypeById: (id: number) => fetchPoke<PokemonType>(`/api/v2/type/${id}`),
  
  /**
   * Get type by Name
   * @param name Name of the type
   * @returns The type: normal, fighting, ...
   */
  getTypeByName: (name: string) =>
    fetchPoke<PokemonType>(`/api/v2/type/${name}`),
}

const pokeApi = {
  pokemon: pokemonApi,
  species: speciesApi,
  type: typeApi,
};

export default pokeApi;
