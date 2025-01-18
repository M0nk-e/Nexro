import { SlashCommand, Context, Options } from 'necord';
import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';

@Injectable()
export class PingCommand {
  @SlashCommand({
    name: 'ping',
    description: 'Replies with Pong!',
    // guilds: ['728657692050194583'],
  })
  async onPing(@Context() [interaction]: [CommandInteraction]) {
    return interaction.reply('Pong!');
  }

}
