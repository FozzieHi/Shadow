const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');
const Logger = require('../utils/Logger.js');

let count = 1;

setInterval(() => {
    (async function () {
        await client.user.setActivity(Configuration.game.activity[count], {type: Configuration.game.type});
        count += count === 0 ? 1 : -1;
    })().catch((err) => Logger.handleError(err));
}, Configuration.intervals.changeStatus);
