/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PingCommand } from './utility/ping.cmd';
import { LevelCommand } from './profile/level.cmd';
import { LevelchatModule } from '../Functions/chat_level/levelchat.module';
import { HelpCommand } from './core/help.cmd';
import { PaginationModule } from '../Functions/pagination/pagination.module';

@Module({
  imports: [LevelchatModule, PaginationModule],
  controllers: [],
  providers: [PingCommand, LevelCommand, HelpCommand],
})
export class CommandModule { }
