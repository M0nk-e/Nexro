/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MessagesEvent } from './message.ev';
import { ReadyEvent } from './ready.ev';
import { LevelchatModule } from '../Functions/chat_level/levelchat.module';
import { CardModule } from '../Functions/card_gen/card.module';

@Module({
  imports: [LevelchatModule],
  providers: [MessagesEvent, ReadyEvent],
})
export class EventsModule {}
