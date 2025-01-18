import { Injectable } from '@nestjs/common';
import { SlashCommand, Context } from 'necord';
import { LevelchatService } from '../../Functions/chat_level/levelchat.service';
import { Client, CommandInteraction } from 'discord.js';
import { createEmbed } from 'src/common/utils/global.embed';
import { ICommand } from 'src/interfaces';

@Injectable()
export class LevelCommand implements ICommand {
  constructor(
    private readonly levelchatService: LevelchatService,
    private readonly client: Client,
  ) {}
  name: 'level';
  description: 'Check your current level and XP';

  @SlashCommand({
    name: 'level',
    description: 'Check your current level and XP',
    guilds: ['728657692050194583'],
  })
  public async onLevelCommand(@Context() [interaction]: [CommandInteraction]) {
    const userId = interaction.user.id;
    const userLevelInfo = await this.levelchatService.getUserLevelInfo(userId);

    if (!userLevelInfo) {
      return interaction.reply('You have not gained any XP yet.');
    }

    const { level, xp } = userLevelInfo;
    const embed = createEmbed(
      'Your Level and XP',
      `You are currently at level ${level} with ${xp} XP.`,
      this.client.user.avatarURL() || '',
    );

    return interaction.reply({ embeds: [embed] });
  }
}
