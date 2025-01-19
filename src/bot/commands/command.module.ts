/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HelpCommand, LevelCommand, PingCommand, VowCommand, MarryCommand } from './compendium';
import { PaginationModule, MarriageModule, LevelchatModule, VowModule } from '../Functions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marriage, User } from 'src/database';


@Module({
  imports: [
    LevelchatModule,
    PaginationModule,
    MarriageModule,
    VowModule,
    TypeOrmModule.forFeature([Marriage, User]),
  ],
  controllers: [],
  providers: [PingCommand, LevelCommand, HelpCommand, MarryCommand, VowCommand],
})
export class CommandModule { }
