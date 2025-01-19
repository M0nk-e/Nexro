import { User } from 'discord.js';
import { UserOption } from 'necord';

export class UserOptionDto {
  @UserOption({
    name: 'user',
    description: 'mention the user you want to use this command with',
    required: true,
  })
  user: User;
}
