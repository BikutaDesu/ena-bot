export default {
  name: 'avatar',
  description: 'Show user profile pic',
  args: false,
  cooldown: 5,
  execute(message, args) {
    message.reply(message.author.displayAvatarURL());
  },
};
