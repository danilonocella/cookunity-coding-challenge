import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CardType } from '../cards/cards.enums';

@Entity()
export class Weakness {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({
    type: 'enum',
    enum: CardType
  })
  main_type: CardType;

  @Column({
    type: 'enum',
    enum: CardType
  })
  weakness_type: CardType;
}