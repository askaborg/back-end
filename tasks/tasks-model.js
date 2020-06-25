const db = require("../database/dbConfig.js")

module.exports = {
  userCategories,
  add
}

function userCategories(userId) {
  return db("categories")
    .where({userId})
}

function add(newTask) {
  return db("tasks")
    .insert(newTask)
}