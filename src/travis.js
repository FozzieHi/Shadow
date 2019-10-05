const client = require('./singletons/client.js');
const db = require('./database/index.js');
const registry = require('./singletons/registry.js');
const reqAbs = require('./utils/reqAbs.js');
const path = require('path');
const {RequireAll} = require('patron.js');

client.registry = registry;
RequireAll(path.join(__dirname, 'events'));

(async () => {
    await db.connect(process.argv[3]);
    await registry.registerGlobalTypeReaders();
    await registry.registerLibraryTypeReaders();
    await registry.registerPreconditions(await reqAbs(__dirname, './preconditions/command'));
    await registry.registerGroups(await reqAbs(__dirname, './groups'));
    await registry.registerCommands(await reqAbs(__dirname, './commands'));
    await client.login(process.argv[2]);
    return process.exit(0);
})().catch((err) => {
    console.log(err);
process.exit(1);
});
