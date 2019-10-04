const credentials = require('./credentials.json');
const client = require('./singletons/client.js');

(async () => {
    await client.login(credentials.token);
    await console.log("Connected to Discord.");
    return process.exit(0);
})().catch((err) => {
    console.log(err);
    process.exit(1);
});
