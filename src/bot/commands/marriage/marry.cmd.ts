import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, Options, SlashCommandContext } from 'necord';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageComponentInteraction,
} from 'discord.js';
import { MarriageService } from 'src/bot/Functions/family/marriage/marriage.service';
import { createEmbed } from 'src/common/utils/global.embed';
import { UserOptionDto } from './dtos/user_option.dto';
import { ICommand } from 'src/interfaces';

@Injectable()
export class MarryCommand implements ICommand {
  constructor(private readonly marriageService: MarriageService) {}
  name: string;
  description: string;

  @SlashCommand({
    name: 'marry',
    description: 'Propose to another user',
    guilds: ['728657692050194583'],
  })
  public async onMarryCommand(
    @Context() [interaction]: SlashCommandContext,
    @Options() options: UserOptionDto,
  ) {
    const proposer = interaction.user;
    const proposee = interaction.guild?.members.cache.get(options.user.id);

    if (!proposee) {
      return interaction.reply('User not found.');
    }
    const proposerMarried = await this.marriageService.isUserMarried(proposer.id);
    const proposeeMarried = await this.marriageService.isUserMarried(proposee.id);

    if (proposerMarried) {
      return interaction.reply('You are already married.');
    }

    if (proposeeMarried) {
      return interaction.reply(`${proposee} is already married.`);
    }

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('accept_marry')
        .setLabel('Accept')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('decline_marry')
        .setLabel('Decline')
        .setStyle(ButtonStyle.Danger),
    );

    const embed = createEmbed(
      'Marriage Proposal',
      `${proposee}, do you accept the marriage proposal from ${proposer}?`,
      proposer.displayAvatarURL(),
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });

    const filter = (i: MessageComponentInteraction) =>
      i.customId === 'accept_marry' || i.customId === 'decline_marry';

    const collector = interaction.channel?.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector?.on('collect', async (i: MessageComponentInteraction) => {
      if (i.customId === 'accept_marry') {
        await this.marriageService.proposeMarriage(proposer.id, proposee.id);

        const acceptEmbed = createEmbed(
          'Marriage Accepted',
          `${proposer} and ${proposee} are now married!`,
          proposer.displayAvatarURL(),
        );

        await i.update({
          embeds: [acceptEmbed],
          components: [],
        });
      } else {
        const declineEmbed = createEmbed(
          'Marriage Declined',
          `${proposee} declined the marriage proposal from ${proposer}.`,
          proposer.displayAvatarURL(),
        );

        await i.update({
          embeds: [declineEmbed],
          components: [],
        });
      }
    });

    collector?.on('end', async (collected) => {
      if (collected.size === 0) {
        const timeoutEmbed = createEmbed(
          'Marriage Proposal Timed Out',
          'Marriage proposal timed out.',
          proposer.displayAvatarURL(),
        );

        await interaction.editReply({
          embeds: [timeoutEmbed],
          components: [],
        });
      }
    });
  }
}
