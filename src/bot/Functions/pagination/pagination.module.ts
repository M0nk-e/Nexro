/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
