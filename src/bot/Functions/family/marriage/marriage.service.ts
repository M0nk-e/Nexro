import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marriage } from 'src/database/entities/marriage.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class MarriageService {
  constructor(
    @InjectRepository(Marriage)
    private readonly marriageRepository: Repository<Marriage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async proposeMarriage(proposerId: string, proposeeId: string): Promise<void> {
    await this.marriageRepository.save({
      user1Id: proposerId,
      user2Id: proposeeId,
      marriedAt: new Date(),
      marriageDuration: 0,
    });
  }

  async updateMarriageDuration(marriageId: number): Promise<void> {
    const marriage = await this.marriageRepository.findOneBy({ id: marriageId });
    if (marriage) {
      const now = new Date();
      const duration = Math.floor(
        (now.getTime() - marriage.marriedAt.getTime()) / (1000 * 60 * 60 * 24),
      ); // Duration in days
      marriage.marriageDuration = duration;
      await this.marriageRepository.save(marriage);
    }
  }

  async getMarriageDetails(marriageId: number): Promise<Marriage | undefined> {
    const marriage = await this.marriageRepository.findOneBy({ id: marriageId });
    if (marriage) {
      await this.updateMarriageDuration(marriageId);
    }
    return marriage;
  }

  async isUserMarried(userId: string): Promise<boolean> {
    const marriage = await this.marriageRepository.findOne({
      where: [{ user1Id: userId }, { user2Id: userId }],
    });
    return !!marriage;
  }
}
