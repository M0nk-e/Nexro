import { AdoptModule } from './bot/Functions/family/adopt/adopt.module';
import { MarriageModule } from './bot/Functions/family/marriage/marriage.module';
import { PaginationModule } from './bot/Functions/pagination/pagination.module';

import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { AppConf } from './config/app.conf';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { NecordPaginationModule } from '@necord/pagination';

@Module({
  imports: [
    AdoptModule,
    MarriageModule,
    PaginationModule,

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
export class AppModule {}
