const db = require("../database/dbConfig.js")

module.exports = {
    add,
    findBy
}

function add(credentials) {
    return db("users")
        .insert(credentials)
}

function findBy(filter) {
    return db("users")
        .where(filter)
}