const {Animals} = require("../db/models");

class AnimalService {
    static getAllAnimals = async () => {
        return await Animals.findAll()
    }
}

module.exports = AnimalService