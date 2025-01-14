/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PingCommand } from './ping.cmd';
import { LevelCommand } from './level.cmd';
import { LevelchatModule } from '../Functions/chat_level/levelchat.module';

@Module({
  imports: [LevelchatModule],
  controllers: [],
  providers: [PingCommand, LevelCommand],
})
export class CommandModule {}
