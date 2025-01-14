import { Injectable } from '@nestjs/common';
import { On, Context, ContextOf } from 'necord';
import { LevelchatService } from '../Functions/chat_level/levelchat.service';

@Injectable()
export class MessagesEvent {
  constructor(private readonly levelchatService: LevelchatService) {}

  @On('messageCreate')
  public async onMessageCreate(
    @Context() [message]: ContextOf<'messageCreate'>,
  ) {
    if (message.author.bot) return;

    console.log(`Message from ${message.author.tag}: ${message.content}`);
    await this.levelchatService.handleMessage(
      message.author.id,
      message.author.username,
      message.author.discriminator,
      message.author.avatarURL(),
    );
  }
}
