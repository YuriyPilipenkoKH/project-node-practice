

const asyncHandler = require('express-async-handler')
const DrinkService = require('../services/DrinkService')

class DrinksController {


    // getAll = asyncHandler( async(req, res)=> {
    //     // res.send('getAll')
    //     const drinks =  await drinksModel.find({})
    //     res.status(201).json({
    //         code: 201,
    //         data: {
    //             drinks,
    //             qty: drinks.length,
    //         }
    //     })
    //     res.json(result)

    // })

    getAll = asyncHandler( async(req, res)=> {
        // res.send('getAll')
        
        const drinks =  await DrinkService.all()
        if (!drinks) {
            res.status(400)
            throw new Error('Unable to fetch')
        }
        res.status(201).json({
            code: 201,
            data: {
                drinks,
                qty: drinks.length,
            }
        })
        // res.json(result)

    })

    getOne =asyncHandler( async(req, res)=> {
        // res.send('getOne')
        const {id} = req.params 
        const drink =  await DrinkService.one({id})

        if(!drink) {
            res.status(400)
            throw new Error('Drink not found')
        }
        res.status(201).json({
            code: 201,
            drink
         
        })

    })

    addDrink = asyncHandler( async (req, res)=> {
        const {name, value} = req.body
        if (!name || !value) {
            res.status(400)
            throw new Error('Provide all required fields')
        }

        const drink =  await DrinkService.add({...req.body})
        // const drink =  await DrinkModel.create({...req.body})

        res.status(201).json({
            code: 201,
            data: {
                drink,
            }
        })
    })

    updateDrink =  asyncHandler( async (req, res)=> {
        // res.send('updateDrink')
        const {id} = req.params 
        const updatedDrink =  await DrinkService.update({id, body: {...req.body}})

        res.status(201).json({
            code: 201,
            data: {
                updatedDrink,
            },
            message: 'Successfully updated'
        })
    })

    removeDrink = asyncHandler( async (req, res)=> {
        const {id} = req.params 
        const drinkToDelete =  await DrinkService.remove({ id })

        res.status(201).json({
            code: 201,
            data: {
                drinkToDelete,
            },
            message: 'Successfully deleted'
        })
        
    })

}

module.exports = new DrinksController()