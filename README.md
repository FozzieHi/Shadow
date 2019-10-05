# Shadow [![Build Status](https://travis-ci.com/FozzieHi/Shadow.svg?branch=master)](https://travis-ci.com/FozzieHi/Shadow)
A Discord bot written in node.js using discord.js &amp; patron.js

# How to run
Create a file called `credentials.json` in the src folder.

Copy these contents over, replacing `exampletoken` with a Discord Bot's token you have created and `mongoConnectionURL` with the MongoDB connection URL for MongoDB 2.2.12 or later.
```json
{
  "mongoConnectionURL": "mongodb://connection-url"
  "token": "exampletoken"
}
```
To run the bot use `node .` or `node src/index.js`
