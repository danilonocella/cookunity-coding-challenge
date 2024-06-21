import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../cards/card.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async simulateBattle(attackerId: number, defenderId: number): Promise<any> {
    const attacker = await this.cardRepository.findOne({
      where: { id: attackerId },
      relations: ['attack', 'weakness'],
    });
    const defender = await this.cardRepository.findOne({
      where: { id: defenderId },
      relations: ['weakness'],
    });

    if (!attacker || !defender) {
      throw new NotFoundException('Card not found');
    }

    const baseDamage = attacker.attack.damage;
    let modifiedDamage = baseDamage;

    // Check if the defender has a weakness to the attacker's type
    if (defender.weakness.weakness_type === attacker.type) {
      modifiedDamage *= 2;
    }

    // Check if the defender has a resistance to the attacker's type
    if (defender.resistance_type === attacker.type) {
      modifiedDamage -= defender.resistance_points;
    }

    const attackSucceeded = modifiedDamage >= defender.hit_points;

    return {
      attacker: attacker.name,
      defender: defender.name,
      baseDamage,
      modifiedDamage,
      attackSucceeded,
    };
  }
}
