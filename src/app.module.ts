import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { AppConf } from './config/app.conf';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConf],
      isGlobal: true,
    }),
    BotModule,
    DatabaseModule,
  ],
})
export class AppModule {}
