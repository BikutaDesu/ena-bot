import config from '../../config.json';

export default (args, command, message) => {
  if (command.args && !args.length) {
    let reply = `Você não informou nenhum argumento, ${message.author}`;
    if (command.usage) {
      reply += `\nForma de usar o comando: \`${config.prefix}${command.name} ${command.usage}\``;
    }
    return reply;
  }
}