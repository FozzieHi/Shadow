const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');

let count = 1;

client.setInterval(() => {
    (async function () {
        await client.user.setActivity(Configuration.game.activity[count], {type: Configuration.game.type});
        count += count === 0 ? 1 : -1;
    })().catch((err) => {
        console.log(err);
    })
}, Configuration.intervals.changeStatus);
