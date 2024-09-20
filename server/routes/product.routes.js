const router = require("express").Router();
const ProductServices = require("../services/Product.services");

const verifyAccessToken = require('../middleware/verifyAccessToken')

router.get("/", async (req, res) => {
  try {
    const product = await ProductServices.getAllProducts();
    res.status(200).json({ message: "success", product });
  } catch (error) {
    res.status(500).json({ message });
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const {image, name, description, amount, article, price } = req.body;
    const { user } = res.locals;

    if (image.trim() === "" || name.trim() === "" || description.trim() === "" || amount <= 0 || article.trim() === "" || price <= 0) {
      res.status(400).json({ message: "Empty values" });
      return;
    }

    const product = await ProductServices.createProduct(image, name, description, amount, article, price, user.id);

    res.status(201).json({ message: "success", product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { image, price, name, description, amount, article } = req.body;
    const { user } = res.locals;
    const product = await ProductServices.updateProduct(  id, user.id, {image, price, name, description, amount, article});
    console.log("ЖИВЫ", product)
    
    if (product) {
      res.status(200).json({ message: "success", product });
      console.log('все хорошо');
      return
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductServices.deleteProduct(id);

    res.status(200).json({ message: "success", data });
  } catch (message) {
    res.status(500).json({ message });
  }
});

module.exports = router;
