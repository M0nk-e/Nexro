import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { BotGateway } from './bot.gateway';
import { CommandModule } from './commands';
import { EventsModule } from './events';
import { IntentsConf } from 'src/config';
import { NecordPaginationModule } from '@necord/pagination';

@Module({
  imports: [
    ConfigModule,
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('Discord_Token'),
        intents: [IntentsConf],
      }),
    }),
    NecordPaginationModule.forRoot({
      buttons: {},
      allowSkip: true,
      allowTraversal: true,
      buttonsPosition: 'end',
    }),
    CommandModule,
    EventsModule,
  ],
  controllers: [],
  providers: [BotGateway],
  exports: [NecordModule],
})
export class BotModule {}
