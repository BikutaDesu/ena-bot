import Discord from 'discord.js';
import dotenv from 'dotenv';
import getCommands from './utils/getCommands.js';
import checkCooldown from './utils/checkCooldown.js';
import checkArgs from './utils/checkArgs.js';
import configs from '../config.json';

dotenv.config();
const client = new Discord.Client();

client.commands = getCommands();
client.cooldowns = new Discord.Collection();

const prefix = configs.prefix;
console.log(prefix);

client.on('ready', () => {
  console.log(`Cirno Bot is Ready!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  let reply = checkCooldown(client, command, message);
  if (reply) {
    return message.reply(reply);
  }

  reply = checkArgs(args, command, message);
  if (reply) {
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Houve um erro ao executar o comando!');
  }
});

client.login(process.env.DISCORD_TOKEN);
