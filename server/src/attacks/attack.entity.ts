import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attack {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  damage: number;
}