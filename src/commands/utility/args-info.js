export default {
  name: 'args-info',
  description: 'Show arguments',
  args: true,
  cooldown: 5,
  usage: '<args>...',
  execute(message, args) {
    if (args[0] === 'victor') {
      return message.channel.send('Um lixo :poop:');
    }
    message.reply(
      `Argumentos informados: ${args}\nQuantidade de argumentos: ${args.length}`
    );
  },
};
