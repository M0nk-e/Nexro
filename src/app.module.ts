import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { AppConf } from './config/app.conf';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { NecordPaginationModule } from '@necord/pagination';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConf],
      isGlobal: true,
    }),
    BotModule,
    NecordPaginationModule.forRoot({
      buttons: {},
      allowSkip: true,
      allowTraversal: true,
      buttonsPosition: 'end',
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
})
export class AppModule { }
