import { GatewayIntentBits, IntentsBitField } from 'discord.js';
export const IntentsConf: Array<GatewayIntentBits> = [
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.MessageContent,
];
