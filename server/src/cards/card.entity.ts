// card.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Attack } from '../attacks/attack.entity';
import { Weakness } from '../weaknesses/weakness.entity';
import { CardType, Rarity, Expansion } from './cards.enums';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CardType,
  })
  type: CardType;

  @Column({
    type: 'enum',
    enum: Rarity,
  })
  rarity: Rarity;

  @Column({
    type: 'enum',
    enum: Expansion,
  })
  expansion: Expansion;

  @Column()
  hit_points: number;

  @ManyToOne(() => Attack)
  attack: Attack;

  @ManyToOne(() => Weakness)
  weakness: Weakness;

  @Column({
    type: 'enum',
    enum: CardType,
    nullable: true,
  })
  resistance_type?: CardType;

  @Column({ nullable: true })
  resistance_points?: number;
}