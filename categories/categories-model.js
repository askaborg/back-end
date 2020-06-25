const db = require("../database/dbConfig")

module.exports = {
  userCategories,
  add,
  remove,
  modify
}

function userCategories(userId) {
  return db("categories")
    .where({userId})
}

function add(newCategory) {
  return db("categories")
    .insert(newCategory)
}

function modify(change, id) {
  return db("categories")
    .where({id})
    .update({ category: change })
}

function remove(id) {
  return db("categories")
    .where({id})
    .del()
}