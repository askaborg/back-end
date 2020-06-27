const db = require("../database/dbConfig.js")
const { andWhere } = require("../database/dbConfig.js")

module.exports = {
  userTasks,
  add,
  remove,
  find,
  modTask,
  modDescription,
  modScheduled,
  modCompleted
}

function userTasks(userId) {
  return db("tasks")
    .where({userId})
}

function add(newTask) {
  return db("tasks")
    .insert(newTask)
}

function modTask(taskId, changeTask) {
    return db("tasks")
      .where({ id: taskId })
      .update({ task: changeTask })
 }

function modDescription(taskId, description) {
    return db("tasks")
      .where({ id: taskId })
      .update({ description: description })
  }

function modScheduled(taskId, scheduled) {
    return db("tasks")
      .where({ id: taskId })
      .update({ scheduled: scheduled })
}

function modCompleted(taskId, completed) {
    return db("tasks")
      .where({ id: taskId })
      .update({ completed: completed })
}

function remove(taskId) {
    return db("tasks")
        .where({id: taskId})
        .del()
}

function find(task, catId, userId) {
    return db("tasks")
        .where({ task: task, catId: catId, userId: userId })
}