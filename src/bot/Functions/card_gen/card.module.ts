import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardScheduler } from './card.scheduler';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [BotModule],
  providers: [CardService, CardScheduler],
  exports: [CardService, CardScheduler],
})
export class CardModule {}
