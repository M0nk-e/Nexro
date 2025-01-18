import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext } from 'necord';
import { PaginationService } from './../../Functions/pagination/pagination.service';

@Injectable()
export class HelpCommand {
    constructor(private readonly paginationService: PaginationService) { }

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
