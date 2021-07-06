import dotenv from 'dotenv';
import Discord from "discord.js";

const client = new Discord.Client();
dotenv.config();

client.on("ready", () => {
  console.log("Opaaaaaaaaaa!");
});

client.login(process.env.DISCORD_TOKEN);