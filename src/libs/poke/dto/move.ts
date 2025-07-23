import { ExternalResource } from "./common";

export interface PokemonMove {
  id: number;
  name: string;
  accuracy: number;
  pp: number;
  priority: number;
  power: number;
  damage_class: ExternalResource;
  type: ExternalResource;
  learned_by_pokemon: ExternalResource[];
  stat_changes: {
    change: number;
    stat: ExternalResource;
  }[];
  meta: {
    ailment: ExternalResource;
    category: ExternalResource;
    min_hits: number | null;
    max_hits: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  }

  level?: number;
}