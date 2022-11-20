const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// finds all categories and includes its associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // console.log(categoryData);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to find one category by its `id` value and includes its associtated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updates a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
