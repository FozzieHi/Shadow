const client = require('./singletons/client.js');
const registry = require('./singletons/registry.js');
const reqAbs = require('./utils/reqAbs.js');
const path = require('path');
const {RequireAll} = require('patron.js');
const IntervalService = require('./services/IntervalService.js');

client.registry = registry;
RequireAll(path.join(__dirname, 'events'));
IntervalService.startService();

(async () => {
    await registry.registerGlobalTypeReaders();
    await registry.registerLibraryTypeReaders();
    await registry.registerPreconditions(await reqAbs(__dirname, './preconditions/command'));
    await registry.registerArgumentPreconditions(await reqAbs(__dirname, './preconditions/argument'));
    await registry.registerGroups(await reqAbs(__dirname, './groups'));
    await registry.registerCommands(await reqAbs(__dirname, './commands'));
    await client.login(process.argv[2]);
    return process.exit(0);
})().catch((err) => {
    console.log(err);
process.exit(1);
});
