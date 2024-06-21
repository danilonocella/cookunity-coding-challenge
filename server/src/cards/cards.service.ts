import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async findAll(
    name?: string,
    expansion?: string,
    type?: string,
  ): Promise<Card[]> {
    let queryBuilder = this.cardsRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.attack', 'attack')
      .leftJoinAndSelect('card.weakness', 'weakness');

    if (name) {
      queryBuilder = queryBuilder.where('card.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (expansion) {
      queryBuilder = queryBuilder.andWhere('card.expansion = :expansion', {
        expansion,
      });
    }

    if (type) {
      queryBuilder = queryBuilder.andWhere('card.type = :type', {
        type,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOne({
      where: { id },
      relations: ['attack', 'weakness'],
    });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async create(card: Card): Promise<Card> {
    return this.cardsRepository.save(card);
  }

  async update(id: number, card: Card): Promise<Card> {
    await this.findOne(id); // Ensure card exists
    await this.cardsRepository.update(id, card);
    return this.cardsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure card exists
    await this.cardsRepository.delete(id);
  }

  async getCardWeaknessesAndResistances(cardId: number) {
    const card = await this.cardsRepository.findOne({
      where: { id: cardId },
      relations: ['weakness', 'attack'],
    });

    if (!card) {
      throw new Error('Card not found');
    }

    // Get all cards to compare against
    const allCards = await this.cardsRepository.find({ relations: ['weakness', 'attack'] });

    const weaknesses = allCards.filter(
      (c) => c.type === card.weakness.weakness_type,
    );

    const resistances = allCards.filter(
      (c) => c.type === card.resistance_type,
    );

    return { weaknesses, resistances };
  }

}
