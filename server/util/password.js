const { hash, compare } = require("bcrypt");

async function createPassword(password) {
    return await hash(password, 10)
}

async function decryptPassword(password, oldPassword) {
    return await compare(password, oldPassword)
}

module.exports = {
    createPassword,
    decryptPassword
}