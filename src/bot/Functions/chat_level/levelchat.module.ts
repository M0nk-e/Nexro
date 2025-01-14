/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelchatService } from './levelchat.service';
import { RateLimitService } from 'src/common/utils/rate.limit';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LevelchatService, RateLimitService],
  exports: [LevelchatService],
})
export class LevelchatModule {}
