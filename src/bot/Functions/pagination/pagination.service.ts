import { Injectable, OnModuleInit } from '@nestjs/common';
import { NecordPaginationService, PageBuilder } from '@necord/pagination';
import { createEmbed } from 'src/common/utils/global.embed';

@Injectable()
export class PaginationService implements OnModuleInit {
  constructor(private readonly paginationService: NecordPaginationService) { }

  async onModuleInit(): Promise<void> {
    try {
      const commandCategories = this.getCommandCategories();
      const pages = commandCategories.map((category) => {
        const description = this.formatCategory(category);
        return new PageBuilder().setEmbeds([
          createEmbed(category.category, description, 'https://placeholder.com/icon.png'),
        ]);
      });

      this.paginationService.register((builder) => builder.setCustomId('help').setPages(pages));
    } catch (error) {
      console.error('Error initializing pagination service:', error);
    }
  }

  public get(customId: string) {
    return this.paginationService.get(customId);
  }

  private getCommandCategories() {
    return [
      {
        category: 'Core',
        commands: [{ name: 'help', description: 'Displays help information' }],
      },
      {
        category: 'Utility',
        commands: [{ name: 'ping', description: 'Replies with Pong!' }],
      },
      {
        category: 'Profile',
        commands: [{ name: 'level', description: 'Displays your level' }],
      },
      {
        category: 'Marriage',
        commands: [
          { name: 'marry', description: 'Propose to another user' },
          { name: 'divorce', description: 'Divorce your partner' },
          { name: 'adopt', description: 'Adopt a child' },
          { name: 'family', description: 'View your family' },
          { name: 'vow', description: 'Renew your vows' },
        ],
      },
    ];
  }

  private formatCategory(category: {
    category: string;
    commands: { name: string; description: string }[];
  }) {
    const commandList = category.commands
      .map((cmd) => `**${cmd.name}**: ${cmd.description}`)
      .join('\n');
    return commandList;
  }
}
