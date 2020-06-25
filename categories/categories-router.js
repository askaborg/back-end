const router = require("express").Router()
const Categories = require("./categories-model")

router.get("/", async (req, res) => {
  const { id } = req.decodedJwt
  try {
    const categories = await Categories.userCategories(id)
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/", async (req, res) => {
  const { id } = req.decodedJwt
  const { category } = req.body
  if (category) {
    try {
      const activeCategories = await Categories.userCategories(id)
      const categoryExists = obj => obj.category === category
      if (activeCategories.some(categoryExists)) {
        res.status(400).json({ message: "Category already exists." })
      } else {
        const newCategory = {...req.body, userId: id}
        await Categories.add(newCategory)
        res.status(200).json({ message: "New category created." })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(406).json({ message: "You need a category." })
  }
})

router.put("/", async (req, res) => {
  const { id } = req.decodedJwt
  const { category, change } = req.body
  if (category && change) {
    try {
      const activeCategories = await Categories.userCategories(id)
      const categoryExists = obj => obj.category === category
      const changeExists = obj => obj.category === change
      if (activeCategories.some(categoryExists) && !activeCategories.some(changeExists)) {
        const { id } = activeCategories.find(obj => obj.category === category)
        await Categories.modify(change, id)
        res.status(200).json({ message: "Changed category name." })
      } else {
        res.status(400).json({
          message: "You don't have that category or new name already exists."
        })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(406).json({ message: "You need a category and change." })
  }
})

router.delete("/", async (req, res) => {
  const { id } = req.decodedJwt
  const { category } = req.body
  if (category) {
    try {
      const activeCategories = await Categories.userCategories(id)
      const categoryExists = obj => obj.category === category
      if (activeCategories.some(categoryExists)) {
        const { id } = activeCategories.find(obj => obj.category === category)
        await Categories.remove(id)
        res.status(200).json({ message: "Category deleted." })
      } else {
        res.status(400).json({ message: "You don't have that category." })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
})

module.exports = router