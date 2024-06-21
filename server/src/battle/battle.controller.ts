import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('simulate')
  async simulateBattle(
    @Body() body: { attackerId: number, defenderId: number },
  ) {
    const { attackerId, defenderId } = body;
    return this.battleService.simulateBattle(attackerId, defenderId);
  }
}