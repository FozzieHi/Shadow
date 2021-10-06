const credentials = require('./credentials.json');
const db = require('./database/index.js');
const client = require('./singletons/client.js');
const registry = require('./singletons/registry.js');
const reqAbs = require('./utils/reqAbs.js');
const path = require('path');
const {RequireAll} = require('patron.js');
const IntervalService = require('./services/IntervalService.js');
const Logger = require('./utils/Logger.js');

client.registry = registry;

(async () => {
    await RequireAll(path.join(__dirname, 'events'));
    await IntervalService.startService();

    await db.connect(credentials.mongoConnectionURL);
    await registry.registerGlobalTypeReaders();
    await registry.registerLibraryTypeReaders();
    await registry.registerTypeReaders(await reqAbs(__dirname, './types'));
    await registry.registerPreconditions(await reqAbs(__dirname, './preconditions/command'));
    await registry.registerArgumentPreconditions(await reqAbs(__dirname, './preconditions/argument'));
    await registry.registerGroups(await reqAbs(__dirname, './groups'));
    await registry.registerCommands(await reqAbs(__dirname, './commands'));
    await client.login(credentials.token);

    for (let i = 0; i < client.guilds.cache.size; i++) { // Cache all members on startup so we can autocomplete expressions with patron.js type handlers.
        await [...client.guilds.cache.values()][i].members.fetch();
    }
})().catch((err) => Logger.handleError(err));
