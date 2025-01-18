import { EmbedBuilder } from 'discord.js';

export function createEmbed(title: string, description: string, iconurl: string, footertext: string = `**@Nexero** | ${Date.now()}`, color: number = 0x00AE86, fields: any[] = []): EmbedBuilder {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .addFields?.(fields)
        .setFooter({ text: footertext, iconURL: iconurl }) // Optional chaining
    return embed;
}
