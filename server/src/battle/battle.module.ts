import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/card.entity';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
