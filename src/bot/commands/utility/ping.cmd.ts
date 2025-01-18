import { SlashCommand, Context } from 'necord';
import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { ICommand } from 'src/interfaces';

@Injectable()
export class PingCommand implements ICommand {
  name: 'ping';
  description: 'Replies with Pong!';
  @SlashCommand({
    name: 'ping',
    description: 'Replies with Pong!',
    // guilds: ['728657692050194583'],
  })
  async onPing(@Context() [interaction]: [CommandInteraction]) {
    return interaction.reply('Pong!');
  }
}
