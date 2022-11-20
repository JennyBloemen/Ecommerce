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
    const categoryData = await Category.create(req.body, {
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

// update a category by its `id` value
router.put("/:id", (req, res) => {});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {});

module.exports = router;
