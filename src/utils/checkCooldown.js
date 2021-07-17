import { Collection } from "discord.js";

export default (client, command, message) => {
  const { cooldowns } = client;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldownAmount || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const reply = `por favor espere mais ${timeLeft.toFixed(
        1
      )} segundo(s) antes de usar o comando \`${command.name}\` novamente.`;
      return reply;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
}