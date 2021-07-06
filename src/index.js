import Discord from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
// import config from './config.json'; - perguntar depois para o Rodrigo

dotenv.config();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('src/commands/')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  import(`./commands/${file}`).then((module) => {
    const command = module.default;
    client.commands.set(command.name, command);
  });
}

const prefix = '#';

client.on('ready', () => {
  console.log(`Cirno Bot is Ready!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Houve um erro ao executar o comando!');
  }

  // if (command === 'ping') {
  //   message.channel.send('Pong 🏓');
  // } else if (command === 'args-info') {
  //   if (!args.length) {
  //     return message.channel.send(
  //       `Desculpa amigo, mas você não informou nenhum parâmetro depois do comando ${message.author}`
  //     );
  //   } else if (args[0] === 'a') {
  //     return message.channel.send('b');
  //   }

  //   message.channel.send(`Primeiro argumento: ${args[0]}`);
  // }
});

client.login(process.env.DISCORD_TOKEN);
