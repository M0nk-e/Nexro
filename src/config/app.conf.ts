export const AppConf = () => ({
  Disocrd_Token: process.env.DISCORD_TOKEN,
  Dev_Guild: process.env.DEV_GUILD,
  Database_Url: process.env.DATABASE_URL,
  Redis_Host: process.env.REDIS_HOST,
  Redis_Port: process.env.REDIS_PORT,
  Redis_Password: process.env.REDIS_PASSWORD,
  Redis_Username: process.env.REDIS_USERNAME,
});
