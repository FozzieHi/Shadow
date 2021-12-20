require('dotenv').config();
const db = require("./src/database/index.js");

global.beforeAll(async () => {
    await db.connect(process.env.DATABASE_URL, process.env.DATABASE_NAME);
});

global.afterAll(async () => {
    await delay(1000);
    await db.close();
})

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
