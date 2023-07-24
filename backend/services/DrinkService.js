const DrinksModel = require("../models/drinksModel");

class DrinksService{
    all = async() => {
        const drinks = await DrinksModel.find({})
        if (!drinks) {
            return null
        }
        return drinks
    }
}

module.exports = new DrinksService()