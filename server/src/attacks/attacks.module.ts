import { Module } from '@nestjs/common';
import { AttacksService } from './attacks.service';
import { AttacksController } from './attacks.controller';

@Module({
  providers: [AttacksService],
  controllers: [AttacksController]
})
export class AttacksModule {}
