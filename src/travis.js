const client = require('./singletons/client.js');

(async () => {
    await client.login(process.argv[2]);
    await console.log("Connected to Discord.");
    return process.exit(0);
})().catch((err) => {
    console.log(err);
    process.exit(1);
});
