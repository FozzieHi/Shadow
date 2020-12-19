# Shadow [![Build Status](https://github.com/FozzieHi/Shadow/workflows/CI/badge.svg)](https://github.com/FozzieHi/Shadow/actions)
A Discord bot written in node.js using discord.js &amp; patron.js

# [Invite](https://shdw.cc)

# How to run
Create a file called `credentials.json` in the src folder.

Copy these contents over, replacing `exampletoken` with a Discord Bot's token you have created and `mongoConnectionURL` with the MongoDB connection URL for MongoDB 2.2.12 or later.
```json
{
  "mongoConnectionURL": "mongodb://connection-url",
  "token": "exampletoken"
}
```

You will need to create the following MongoDB collections: `guilds`, `users`, `mutes`, `bans`. This can be done by changing `collection()` to `createCollection()` in `src/database/db/Database.js`.
To run the bot use `node .` or `node src/index.js`
