const path = require('path');
const {RequireAll} = require('patron.js');

module.exports = async (name, dir) => await RequireAll(path.join(name, dir));
