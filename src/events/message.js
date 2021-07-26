import checkCooldown from '../utils/checkCooldown.js';
import checkArgs from '../utils/checkArgs.js';
import configs from '../../config.json';

export default {
  name: 'message',
  execute(message, client) {
    const prefix = configs.prefix;

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
  },
};
