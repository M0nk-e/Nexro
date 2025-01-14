import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, Options } from 'necord';
import { LevelchatService } from '../Functions/chat_level/levelchat.service';
import { CommandInteraction } from 'discord.js';

@Injectable()
export class LevelCommand {
  constructor(private readonly levelchatService: LevelchatService) {}

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
    return interaction.reply(
      `You are currently at level ${level} with ${xp} XP.`,
    );
  }
}
