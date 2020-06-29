const router = require("express").Router()
const Tasks = require("./tasks-model.js")
const Categories = require("../categories/categories-model.js")

router.get("/", async (req, res) => {
  const { id } = req.decodedJwt
  try {
    const tasks = await Tasks.userTasks(id)
    res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/", async (req, res) => {
    const { id } = req.decodedJwt
    const userId = id
    const { category, task } = req.body

    if (category && task ) {
        try {
            const activeCategories = await Categories.userCategories(id)
            const categoryExists = obj => obj.category === category
            if (activeCategories.some(categoryExists)) {
                const { id } = activeCategories.find(obj => obj.category === category)
                const newTask = { task:task, catId: id, userId: userId }
                await Tasks.add(newTask)
                res.status(200).json({ message: "New task added."})
            } else {
                res.status(400).json({ message: "You don't have that category." })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(406).json({ message: "You need a category and task." })
    }
})

router.put("/", async (req, res) => {
    const { id } = req.decodedJwt
    const userId = id
    const { category, task } = req.body

    if (category && task ) {
        try {
            const activeCategories = await Categories.userCategories(id)
            const categoryExists = obj => obj.category === category
            
            if (activeCategories.some(categoryExists)) {
                const { id } = activeCategories.find(obj => obj.category === category)
                const catId = id
                const taskToModify = await Tasks.find(task, catId, userId).first()
                if (taskToModify) {
                    const { description, scheduled, completed, changeTask } = req.body
                    const { id } = taskToModify
                    const taskId = id
                    if (description) {
                        await Tasks.modDescription(taskId, description)
                    }
                    if (scheduled) {
                        await Tasks.modScheduled(taskId, scheduled)
                    }
                    if (completed) {
                        await Tasks.modCompleted(taskId, completed)
                    }
                    if (changeTask) {
                        await Tasks.modTask(taskId, changeTask)
                    }
                    res.status(200).json({ message: "Task modified." })
                } else {
                    res.status(406).json({ message: "No task in category." })
                }
            } else {
                res.status(406).json({ message: "You don't even have that category." })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(406).json({ message: "You need a category and task." })
    }
})

router.delete("/", async (req, res) => {
    const { id } = req.decodedJwt
    const { category, task } = req.body
    const userId = id
    if (category && task ) {
      try {
        const activeCategories = await Categories.userCategories(id)
        const categoryExists = obj => obj.category === category
        if (activeCategories.some(categoryExists)) {
          const { id } = activeCategories.find(obj => obj.category === category)
          const catId = id
          const taskToRemove = await Tasks.find(task, catId, userId).first()
          console.log("ttr", taskToRemove)
          if (taskToRemove) {
            const { id } = taskToRemove
            const taskId = id
            await Tasks.remove(taskId)
            res.status(200).json({ message: "Task deleted." })
          }
        } else {
          res.status(400).json({ message: "You don't have that category." })
        }
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
        res.status(406).json({ message: "You need a category and task." })
    }
  })

module.exports = router