const bcrypt = require("bcryptjs");
const User = require('../../models/user');

function comparePass(userPassword, databasePassword) {
    console.log("hey",userPassword, databasePassword);
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
    comparePass,
}
