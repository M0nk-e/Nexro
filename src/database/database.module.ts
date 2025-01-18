import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { Marriage } from './entities/marriage.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'cockroachdb',
        url: configService.get<string>('Database_Url'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Wallet, Marriage],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
