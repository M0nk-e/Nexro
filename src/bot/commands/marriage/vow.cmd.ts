import { SlashCommand, Context } from 'necord';
import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { VowService } from 'src/bot/Functions/family/vow/vow.service';
import { createEmbed } from 'src/common/utils/global.embed';

@Injectable()
export class VowCommand {
    constructor(private readonly vowService: VowService) { }

    @SlashCommand({
        name: 'vow',
        description: 'Renew your vows with your partner',
        guilds: ['728657692050194583']
    })
    async onVow(@Context() [interaction]: [CommandInteraction]) {
        const userId = interaction.user.id;
        const result = await this.vowService.renewVows(userId);

        const embed = createEmbed(
            'Vow Renewal',
            result,
            interaction.user.displayAvatarURL(),
        );

        return interaction.reply({ embeds: [embed] });
    }
}
