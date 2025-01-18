export const AppConf = () => ({
  Discord_Token: process.env.DISCORD_TOKEN,
  Dev_Guild: process.env.DEV_GUILD,
  Database_Url: process.env.DATABASE_URL,
  Redis_Host: process.env.REDIS_HOST,
  Redis_Port: parseInt(process.env.REDIS_PORT, 10),
  Redis_Password: process.env.REDIS_PASSWORD,
  Redis_Username: process.env.REDIS_USERNAME,
  Card_Channel_Id: process.env.CARD_CHANNEL_ID,
});
