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
          const removeTask = { task: task, catId: catId, userId: userId }
          await Tasks.remove(removeTask)
          res.status(200).json({ message: "Task deleted." })
        } else {
          res.status(400).json({ message: "You don't have that category." })
        }
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
        res.status(406).json({ message: "You need a category and task"})
    }
  })

module.exports = router