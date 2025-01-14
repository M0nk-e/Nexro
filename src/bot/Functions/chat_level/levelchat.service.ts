import { Injectable } from '@nestjs/common';
import { RateLimitService } from 'src/common/utils/rate.limit';
import Redis from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class LevelchatService {
  private redisClient: Redis;

  constructor(
    private readonly rateLimitService: RateLimitService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async ensureUserExists(
    userId: string,
    username: string,
    discriminator: string,
    avatar: string | null,
  ): Promise<void> {
    let user = await this.userRepository.findOne({
      where: { discordId: userId },
    });
    if (!user) {
      user = this.userRepository.create({
        discordId: userId,
        username,
        discriminator,
        avatar,
        level: 0,
        xp: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.userRepository.save(user);
      console.log(`Created new user: ${username}#${discriminator}`);
    }
  }

  async handleMessage(
    userId: string,
    username: string,
    discriminator: string,
    avatar: string | null,
  ): Promise<void> {
    await this.ensureUserExists(userId, username, discriminator, avatar);

    const isRateLimited = await this.rateLimitService.isRateLimited(userId);

    if (isRateLimited) {
      console.log(`User ${userId} is rate limited.`);
      return;
    }

    const xp = Math.floor(Math.random() * 100) + 1; // Random XP between 1 and 100
    const user = await this.userRepository.findOne({
      where: { discordId: userId },
    });
    if (user) {
      user.xp += xp;
      user.updatedAt = new Date();
      await this.userRepository.save(user);
      console.log(`User ${userId} gained ${xp} XP. Total XP: ${user.xp}`);
    }
  }

  async getUserLevelInfo(
    userId: string,
  ): Promise<{ level: number; xp: number } | null> {
    const user = await this.userRepository.findOne({
      where: { discordId: userId },
    });
    if (!user) {
      return null;
    }
    return { level: user.level, xp: user.xp };
  }
}
