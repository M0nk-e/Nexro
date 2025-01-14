import Redis, { Redis as RedisType } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
class RedisClient {
  private static instance: RedisType;

  private constructor() {}

  public static getInstance(configService: ConfigService): RedisType {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis({
        host: configService.get<string>('Redis_Host'),
        port: configService.get<number>('Redis_Port'),
        password: configService.get<string>('Redis_Password'),
        username: configService.get<string>('Redis_Username'),
      });
    }
    return RedisClient.instance;
  }
}

export default RedisClient;
