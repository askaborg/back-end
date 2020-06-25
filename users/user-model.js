const db = require("../database/dbConfig.js")

module.exports = {
    add,
    findBy,
    list
}

function list() {
    return db("users").select("username")
}
function add(credentials) {
    return db("users")
        .insert(credentials)
}

function findBy(filter) {
    return db("users")
        .where(filter)
}