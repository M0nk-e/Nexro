import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';
import { Module } from '@nestjs/common';
import { CommandModule } from './commands/command.module';
import { NecordModule } from 'necord';
import { ConfigModule, ConfigService } from '@nestjs/config';
import IntentsConf from 'src/config/intent.array';
import { EventsModule } from './events/events.module';

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
    CommandModule,
    EventsModule,
  ],
  controllers: [],
  providers: [BotService, BotGateway],
})
export class BotModule {}
