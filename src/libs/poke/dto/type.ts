import { ExternalResource } from "./common";

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