import { Module } from '@nestjs/common';
import { WeaknessesService } from './weaknesses.service';
import { WeaknessesController } from './weaknesses.controller';

@Module({
  providers: [WeaknessesService],
  controllers: [WeaknessesController]
})
export class WeaknessesModule {}
