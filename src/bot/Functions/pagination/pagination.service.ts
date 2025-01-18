import { Injectable, OnModuleInit } from '@nestjs/common';
import { NecordPaginationService, PageBuilder } from '@necord/pagination';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PaginationService implements OnModuleInit {
    constructor(private readonly paginationService: NecordPaginationService) { }

    onModuleInit(): void {
        const commandCategories = this.getCommandCategories();
        const pages = commandCategories.map((category) =>
            new PageBuilder().setContent(this.formatCategory(category))
        );

        this.paginationService.register((builder) =>
            builder
                .setCustomId('help')
                .setPages(pages)
        );
    }

    public get(customId: string) {
        return this.paginationService.get(customId);
    }

    private getCommandCategories() {
        const commandDir = join(__dirname, '../../commands'); // Update the path to the correct directory
        const categories = readdirSync(commandDir)
            .filter((folder) => statSync(join(commandDir, folder)).isDirectory()) // Ensure the item is a directory
            .map((folder) => {
                const commands = readdirSync(join(commandDir, folder))
                    .filter((file) => file.endsWith('.js')) // Ensure only JavaScript files are processed
                    .map((file) => {
                        const command = require(join(commandDir, folder, file));
                        return {
                            name: command.name || file.replace('.js', ''),
                            description: command.description || 'No description available',
                        };
                    });
                return { category: folder, commands };
            });
        return categories;
    }

    private formatCategory(category: { category: string; commands: any[] }) {
        const commandList = category.commands
            .map((cmd) => `**${cmd.name}**: ${cmd.description}`)
            .join('\n');
        return `**${category.category}**\n${commandList}`;
    }
}
