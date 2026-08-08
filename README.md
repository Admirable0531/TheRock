# TheRock

A Discord bot that returns Google Images search results as a slash command.

## Stack

- discord.js v14
- node-cron (scheduled tasks)
- MongoDB

## Setup

```bash
git clone https://github.com/Admirable0531/TheRock.git
cd TheRock
npm install
```

Create a `.env` with `DISCORD_TOKEN`, then:

```bash
node deploy-commands.js   # register slash commands
node index.js             # start the bot
```
