import { ExternalResource, Indexable } from './common';

export interface PokemonTypeExternal {
  slot: number;
  type: ExternalResource;
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
  moves: {
    move: ExternalResource;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: ExternalResource;
      order: number | null;
      version_group: ExternalResource;
    }[];
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: ExternalResource;
  }[];
  types: PokemonTypeExternal[];
  past_types: {
    generation: ExternalResource;
    types: PokemonTypeExternal[];
  }[];
}
