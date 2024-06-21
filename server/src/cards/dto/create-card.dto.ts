import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Pikachu' })
  name: string;

  @ApiProperty({ example: 'Electric' })
  type: string;

  @ApiProperty({ example: 'Common' })
  rarity: string;

  @ApiProperty({ example: 'Base Set' })
  expansion: string;

  @ApiProperty({ example: 60 })
  hit_points: number;

  @ApiProperty({ example: 1 })
  attack_id: number;

  @ApiProperty({ example: 1 })
  weakness_id: number;

  @ApiProperty({ example: 'Water', required: false })
  resistance_type?: string;

  @ApiProperty({ example: 20, required: false })
  resistance_points?: number;
}