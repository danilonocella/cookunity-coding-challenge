import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';
import { AttacksModule } from './attacks/attacks.module';
import { WeaknessesModule } from './weaknesses/weaknesses.module';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGUSER,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    CardsModule,
    AttacksModule,
    WeaknessesModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
