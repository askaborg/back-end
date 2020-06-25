const db = require("../database/dbConfig.js")

module.exports = {
  userCategories,
  add
}

function userCategories(userId) {
  return db("categories")
    .where({userId})
}

function add(newCategory) {
  return db("categories")
    .insert(newCategory)
}