import { Collection } from 'discord.js';
import fs from 'fs';

export default () => {
  const commands = new Collection();
  const commandFolders = fs.readdirSync('src/commands/');

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`src/commands/${folder}`)
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      import(`../commands/${folder}/${file}`).then((module) => {
        const command = module.default;
        commands.set(command.name, command);
      });
    }
  }
  return commands;
};
