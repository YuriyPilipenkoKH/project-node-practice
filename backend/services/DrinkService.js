const DrinksModel = require("../models/drinksModel");

class DrinksService{
    all = async(req, res) => {
        
        const drinks = await DrinksModel.find({})
        if (!drinks) {
            return null
        }
        return drinks
    }

    one = async(req, res) =>  {

        const { id }= req
        if(!id) {
            return null
        }
            const drink = await DrinksModel.findById(id)
            return drink
    }

    add = async(req, res) =>  {

        const {name, value} = req
        const drink =  await DrinksModel.create({...req})
        // console.log('drink', drink)
        return drink

    }

    update = async(req, res) =>  {
        
        const { id, body }= req
        // console.log('id', id)
        // console.log('body', body)
        const drink =  await DrinksModel.findByIdAndUpdate(id, body, {new: true})
        return drink

    }

    remove = async(req, res) =>  {
        
        const { id }= req
        // console.log('id', id)
        const drink =  await DrinksModel.findByIdAndDelete(id)
        return drink

    }
}

module.exports = new DrinksService()