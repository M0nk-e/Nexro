import { TypeOrmModule } from '@nestjs/typeorm';
import { MarriageService } from './marriage.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Marriage } from 'src/database';
import { User } from 'src/database';

@Module({
  imports: [TypeOrmModule.forFeature([User, Marriage])],
  controllers: [],
  providers: [MarriageService],
  exports: [MarriageService],
})
export class MarriageModule {}
