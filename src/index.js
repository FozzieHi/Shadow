const credentials = require('./credentials.json');
const client = require('./singletons/client.js');

(async () => {
    await client.login(credentials.token);
    console.log("Connected to Discord.");
})().catch((err) => {
    console.log(err);
});
