import { ExternalResource, Indexable } from './common';

export interface PokemonEvolution {
  id: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: ExternalResource;
}

export interface PokemonType {
  slot: number;
  type: ExternalResource;
}

export interface PokemonMove {
  move: ExternalResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: ExternalResource;
    order: number | null;
    version_group: ExternalResource;
  }[];
}

export interface PokemonSprites extends Indexable<string | null> {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  species: ExternalResource;
  sprites: PokemonSprites;
  abilities: {
    ability: ExternalResource;
    is_hidden: boolean;
    slot: number;
  }[];
  cries: {
    latest: string | null;
    legacy: string | null;
  };
  moves: PokemonMove[];
  stats: {
    base_stat: number;
    effort: number;
    stat: ExternalResource;
  }[];
  types: PokemonType[];
  past_types: {
    generation: ExternalResource;
    types: PokemonType[];
  }[];
}

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

export interface PokemonType {
  id: number;
  name: string;

  damage_relations: {
    no_damage_to: ExternalResource[];
    half_damage_to: ExternalResource[];
    double_damage_to: ExternalResource[];
    no_damage_from: ExternalResource[];
    half_damage_from: ExternalResource[];
    double_damage_from: ExternalResource[];
  };
  move_damage_class: ExternalResource;
  pokemon: {
    slot: number;
    pokemon: ExternalResource;
  }[];
  moves: ExternalResource[];
}
