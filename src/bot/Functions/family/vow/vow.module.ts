/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { VowService } from './vow.service';
import { Marriage, User } from 'src/database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, Marriage])],
    controllers: [],
    providers: [VowService],
    exports: [VowService],
})
export class VowModule { }
