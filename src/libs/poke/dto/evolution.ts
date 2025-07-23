import { ExternalResource } from "./common";

export interface EvolutionChainLink {
  is_baby: boolean;
  species: ExternalResource;
  evolves_to: EvolutionChainLink[];
}

export interface PokemonEvolutionChain {
  id: number;
  chain: {
    is_baby: boolean;
    species: ExternalResource;
    evolves_to: EvolutionChainLink[];
  }
}