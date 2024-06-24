import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';
import { AttacksModule } from './attacks/attacks.module';
import { WeaknessesModule } from './weaknesses/weaknesses.module';
import { BattleModule } from './battle/battle.module';
import { ormConfig } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CardsModule,
    AttacksModule,
    WeaknessesModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
