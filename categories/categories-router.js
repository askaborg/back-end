const router = require("express").Router()
const Categories = require("./categories-model.js")

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

module.exports = router