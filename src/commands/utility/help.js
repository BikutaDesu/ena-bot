import configs from '../../../config.json';

export default {
  name: 'help',
  description:
    'Lista com todos os comandos, ou informações sobre um comando específico.',
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Aqui está uma lista com todos os meu comandos:');
      data.push(commands.map((command) => command.name).join(', '));
      data.push(
        `\nVocê pode digitar \`${configs.prefix}help [comando]\` para saber mais sobre algum comando específico.`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('te mandei uma DM com todos os meus comandos. ;)');
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply('Não foi possível te mandar uma mensagem na DM. :/');
        });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name);

    if (!command) return message.reply('Comando inválido!');

    data.push(`**Nome:** ${command.name}`);
    if (command.description) data.push(`**Descrição:** ${command.description}`);
    if (command.usage)
      data.push(`**Mode de uso:** ${configs.prefix}${command.name} ${command.usage}`);
  },
};
