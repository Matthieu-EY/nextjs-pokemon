import { ExternalResource } from "./common";

export interface PokemonSpecies {
  id: number;
  name: string;

  evolves_from_species: ExternalResource;
  evolution_chain: {
    url: string;
  };
  names: {
    name: string;
    language: ExternalResource;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: ExternalResource;
    version: ExternalResource;
  }[];
}