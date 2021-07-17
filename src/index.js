import Discord from 'discord.js';
import dotenv from 'dotenv';
import getCommands from './utils/getCommands.js';
import configs from '../config.json';

dotenv.config();
const client = new Discord.Client();

client.commands = getCommands();
client.cooldowns = new Discord.Collection();

const prefix = configs.defaultPrefix;

client.on('ready', () => {
  console.log(`Cirno Bot is Ready!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  const { cooldowns } = client;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldownAmount || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `por favor espere mais ${timeLeft.toFixed(
          1
        )} segundo(s) antes de usar o comando \`${command.name}\` novamente.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  if (command.args && !args.length) {
    let reply = `Você não informou nenhum argumento, ${message.author}`;
    if (command.usage) {
      reply += `\nForma de usar o comando: \`${prefix}${commandName} ${command.usage}\``;
    }
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
