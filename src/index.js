import Discord from 'discord.js';
import dotenv from 'dotenv';
import getCommands from './utils/getCommands.js';
// import config from './config.json'; - perguntar depois para o Rodrigo

dotenv.config();
const client = new Discord.Client();

client.commands = getCommands();

const prefix = 'c!';

client.on('ready', () => {
  console.log(`Cirno Bot is Ready!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

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
