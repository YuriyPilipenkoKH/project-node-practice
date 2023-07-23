const drinksModel = require('../models/drinksModel')
const DrinkModel = require('../models/drinksModel')
const asyncHandler = require('express-async-handler')

class DrinksController {


    getAll = asyncHandler( async(req, res)=> {
        // res.send('getAll')
        const drinks =  await drinksModel.find({})
        res.status(201).json({
            code: 201,
            data: {
                drinks,
                qty: drinks.length,
            }
        })
        res.json(result)

    })

    getOne =(req, res)=> {
        res.send('getOne')
    }

    addDrink = asyncHandler( async (req, res)=> {
        const {name, value} = req.body
        if (!name || !value) {
            res.status(400)
            throw new Error('Provide all required fields')
        }

        const drink =  await DrinkModel.create({...req.body})

        res.status(200).json({
            code: 200,
            data: {
                drink,
            }
        })
    })

    updateDrink =(req, res)=> {
        res.send('updateDrink')
    }

    removeDrink =(req, res)=> {
        res.send('removeDrink')
    }

}

module.exports = new DrinksController()