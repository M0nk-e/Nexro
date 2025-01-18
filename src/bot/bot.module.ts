import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';
import { CommandModule } from './commands/command.module';
import { EventsModule } from './events/events.module';
import IntentsConf from 'src/config/intent.array';
import { NecordPaginationModule } from '@necord/pagination';

@Module({
  imports: [

    ConfigModule,
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('Disocrd_Token'), // Use ConfigService to get the token
        intents: [IntentsConf], // Specify the intents your bot needs
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
  providers: [BotService, BotGateway],
  exports: [NecordModule], // Export NecordModule to make Client available
})
export class BotModule { }
