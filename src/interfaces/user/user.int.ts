export interface IUser {
  discordId: string;
  username: string;
  discriminator: string;
  level: number;
  xp: number;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
