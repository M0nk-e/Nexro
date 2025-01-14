import { Injectable } from '@nestjs/common';
import RedisClient from './redis.client';
import { ConfigService } from '@nestjs/config';
import { Redis as RedisType } from 'ioredis';

@Injectable()
export class RateLimitService {
  private redisClient: RedisType;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = RedisClient.getInstance(this.configService);
    console.log('RateLimitService initialized');
  }

  async isRateLimited(userId: string): Promise<boolean> {
    const key = `rate-limit:${userId}`;
    const current = await this.redisClient.get(key);

    if (current && parseInt(current) >= 3) {
      return true;
    }

    await this.redisClient.multi().incr(key).expire(key, 130).exec();

    return false;
  }
}
