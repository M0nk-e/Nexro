import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext } from 'necord';
import { PaginationService } from './../../Functions';
import { ICommand } from 'src/interfaces';

@Injectable()
export class HelpCommand implements ICommand {
  constructor(private readonly paginationService: PaginationService) {}
  name: 'help';
  description: 'Display all commands with pagination';

  @SlashCommand({ name: 'help', description: 'Display all commands with pagination' })
  public async onHelpCommand(@Context() [interaction]: SlashCommandContext) {
    const pagination = this.paginationService.get('help');
    if (!pagination) {
      return interaction.reply('Pagination not found.');
    }
    const page = await pagination.build();

    return interaction.reply(page);
  }
}
