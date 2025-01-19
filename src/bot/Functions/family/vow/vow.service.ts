/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marriage } from 'src/database';

@Injectable()
export class VowService {
    constructor(
        @InjectRepository(Marriage)
        private readonly marriageRepository: Repository<Marriage>,
    ) { }

    async renewVows(userId: string): Promise<string> {
        const marriage = await this.marriageRepository.findOne({
            where: [{ user1Id: userId }, { user2Id: userId }],
        });

        if (!marriage) {
            return 'You are not married.';
        }

        const now = new Date();
        const lastVow = marriage.lastVow ? new Date(marriage.lastVow) : null;
        const vowCooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const vowResetTime = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

        if (lastVow && now.getTime() - lastVow.getTime() < vowCooldown) {
            return 'You can only renew your vows once every 24 hours.';
        }

        if (lastVow && now.getTime() - lastVow.getTime() > vowResetTime) {
            marriage.vowStreak = 0; // Reset vow streak if more than 48 hours have passed
        }

        marriage.vowStreak += 1;
        marriage.lastVow = now;
        await this.marriageRepository.save(marriage);

        return `Vows renewed successfully! Your current vow streak is ${marriage.vowStreak}.`;
    }
}
