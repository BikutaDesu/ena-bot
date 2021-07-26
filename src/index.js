import Discord from 'discord.js';
import dotenv from 'dotenv';
import getCommands from './utils/getCommands.js';
import fs from 'fs';

dotenv.config();
const client = new Discord.Client();

client.commands = getCommands();
client.cooldowns = new Discord.Collection();

const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  import(`./events/${file}`).then((module) => {
    const event = module.default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  });
}

client.login(process.env.DISCORD_TOKEN);
