import { Attack } from "./Attack";
import { CardType } from "./Cardtype";
import { Expansion } from "./Expansion";
import { Rarity } from "./Rarity";
import { Weakness } from "./Weakness";

export type Card = {
  id: number;
  name: string;
  type: CardType;
  rarity: Rarity;
  expansion: Expansion;
  hit_points: number;
  resistance_type: CardType;
  resistance_points: number;
  attack: Attack;
  weakness: Weakness;
};
