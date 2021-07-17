export default {
  name: 'ping',
  description: 'Ping!',
  args: false,
  cooldownAmount: 5,
  execute(message, args) {
    message.channel.send('Pong 🏓');
  },
};
