import { CardType } from "./enums/CardType"

export type Weakness = {
  "_id": number,
  "main_type": CardType,
  "weakness_type": CardType
}
