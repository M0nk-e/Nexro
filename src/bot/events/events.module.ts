/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MessagesEvent } from './message.ev';
import { ReadyEvent } from './ready.ev';
import { LevelchatModule } from '../Functions/chat_level/levelchat.module';

@Module({
  imports: [LevelchatModule],
  controllers: [],
  providers: [MessagesEvent, ReadyEvent],
})
export class EventsModule {}
