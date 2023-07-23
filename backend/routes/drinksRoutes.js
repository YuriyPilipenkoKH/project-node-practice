//  /api/v1/drinks
const drinksController = require('../controllers/DrinksController')

const drinksRouter = require('express').Router()


drinksRouter.get('/drinks', drinksController.getAll)

drinksRouter.get('/drinks/:id', drinksController.getOne)

drinksRouter.post('/drinks', (req, res, next) => {
    console.log('joi works')
    next()
}, drinksController.addDrink)

drinksRouter.patch('/drinks/:id', drinksController.updateDrink)

drinksRouter.delete('/drinks/:id', drinksController.removeDrink)


 
module.exports = drinksRouter