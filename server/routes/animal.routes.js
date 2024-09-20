const AnimalService = require("../services/Animal.services");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const animals = await AnimalService.getAllAnimals();
    res.status(200).json({animals})
  } catch (error) {
    res.status(500).json({error})
  }
});

module.exports = router;
