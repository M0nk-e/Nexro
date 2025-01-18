import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, Options } from 'necord';
import { LevelchatService } from '../../Functions/chat_level/levelchat.service';
import { Client, CommandInteraction } from 'discord.js';
import { createEmbed } from 'src/common/utils/global.embed';

@Injectable()
export class LevelCommand {
  constructor(
    private readonly levelchatService: LevelchatService,
    private readonly client: Client
  ) { }

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
    const embed = createEmbed('Your Level and XP', `You are currently at level ${level} with ${xp} XP.`, this.client.user.avatarURL() || '');


    return interaction.reply({ embeds: [embed] });
  }
}
