import { User } from 'discord.js';
import { UserOption } from 'necord';

export class UserOptionDto {
  @UserOption({
    name: 'user',
    description: 'user to marry',
    required: true,
  })
  user: User;
}
