import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Client, TextChannel, ActionRowBuilder, ButtonStyle } from 'discord.js';
import { ButtonBuilder } from '@discordjs/builders';
import { CardService } from './card.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CardScheduler {
  private readonly channelId: string;

  constructor(
    private readonly cardService: CardService,
    private readonly client: Client,
    private readonly configService: ConfigService,
  ) {
    this.channelId = this.configService.get<string>('Card_Channel_Id');
  }

  @Cron('*/30 * * * * *')
  async handleCron() {
    const card = this.cardService.generateCard();
    const channel = this.client.channels.cache.get(this.channelId) as TextChannel;

    if (channel) {
      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`claim_card/${card.name}`)
            .setLabel('Claim Card')
            .setStyle(ButtonStyle.Primary),
        );

      await channel.send({
        content: `A ${card.rarity} card has spawned: ${card.name}`,
        files: [card.assetPath],
        components: [row],
      });
    }
  }
}