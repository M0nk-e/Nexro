/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MessagesEvent } from './message.ev';
import { LevelchatModule } from 'src/bot/Functions';
// import { CardModule } from '../Functions/card_gen/card.module';

@Module({
  imports: [LevelchatModule],
  providers: [MessagesEvent],
})
export class EventsModule {}
