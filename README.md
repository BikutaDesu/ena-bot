# Ena Bot

**This project** was made with the purpose of learning more about JavaScript, it uses the [Discord.js](https://discord.js.org/#/) library to make a bot that interacts with discord servers.

## Requirements

| Dependencies                     | Description        |
| -------------------------------- | ------------------ |
| [![node-version]][node-download] | Javascript Runtime |

[node-download]: https://nodejs.org/download/release/v14.14.0/
[node-version]: https://img.shields.io/badge/node-v14.14.0-blue

## Project Setup

1. to **clone the repository** you will need to have [git](https://git-scm.com/downloads) installed:

```bash
git clone git@github.com:BikutaDesu/cirno-bot.git
```

2. Enter at repository:

```bash
cd cirno-bot
```

3. To **install dependencies** you will need to have [NodeJS](https://nodejs.org/en) installed, you can also install dependencies using [yarn](https://yarnpkg.com/):

```bash
npm i
#or
yarn
```

4. To inform the **bot token** you will need to create a file named `.env` at the root of the project and put a variable named `DISCORD_TOKEN` with the token given to you by the [Discord Developer Portal](https://discord.com/developers/applications)

[![Enviroment File](https://github.com/BikutaDesu/cirno-bot/blob/assets/images/env_example.png)](https://raw.githubusercontent.com/BikutaDesu/cirno-bot/assets/images/env_example.png)

## Run app

```bash
npm run dev
```
