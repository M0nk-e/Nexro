/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PingCommand } from './utility/';
import { LevelCommand } from './profile';
import { LevelchatModule } from '../Functions';
import { HelpCommand } from './core';
import { PaginationModule } from '../Functions';
import { MarryCommand } from './marriage';
import { MarriageModule } from '../Functions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marriage } from 'src/database';
import { User } from 'src/database';

@Module({
  imports: [
    LevelchatModule,
    PaginationModule,
    MarriageModule,
    TypeOrmModule.forFeature([Marriage, User]),
  ],
  controllers: [],
  providers: [PingCommand, LevelCommand, HelpCommand, MarryCommand],
})
export class CommandModule {}
