const db = require("../database/dbConfig.js")
const { andWhere } = require("../database/dbConfig.js")

module.exports = {
  userTasks,
  findTask,
  add,
  remove
}

function userTasks(userId) {
  return db("tasks")
    .where({userId})
}

function add(newTask) {
  return db("tasks")
    .insert(newTask)
}

function remove(id) {
    return db("tasks")
        .where(id)
        .del()
}

function findTask() {
    return db("tasks")
        // .where(Id)
}