import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { Expansion, CardType } from './cards.enums';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('expansions')
  @ApiOperation({ summary: 'Get all card expansions' })
  getExpansions(): Record<string, string> {
    return Expansion;
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all card types' })
  getTypes(): Record<string, string> {
    return CardType;
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'expansion', required: false, enum: Expansion })
  @ApiQuery({ name: 'type', required: false, enum: CardType })
  findAll(
    @Query('name') name?: string,
    @Query('expansion') expansion?: string,
    @Query('type') type?: string,
  ): Promise<Card[]> {
    return this.cardsService.findAll(name, expansion, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({ type: CreateCardDto })
  create(@Body() card: Card): Promise<Card> {
    return this.cardsService.create(card);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing card' })
  update(@Param('id') id: string, @Body() card: Card): Promise<Card> {
    return this.cardsService.update(Number(id), card);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing card by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: string): Promise<void> {
    return this.cardsService.remove(Number(id));
  }

  @Post('weaknesses-and-resistances')
  @ApiOperation({
    summary:
      'retrieve the weaknesses and resistance of an existing card by its ID',
  })
  @ApiBody({
    description: 'Card ID',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  async getCardWeaknessesAndResistances(@Body() body: { id: number }) {
    const cardId = body.id;
    if (isNaN(cardId)) {
      throw new Error('Invalid card ID');
    }

    return this.cardsService.getCardWeaknessesAndResistances(cardId);
  }
}
