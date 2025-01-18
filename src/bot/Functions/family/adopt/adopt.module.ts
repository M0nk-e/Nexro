/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AdoptService } from './adopt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AdoptService],
})
export class AdoptModule {}
