// drinksRoutes
//  /api/v1/drinks
const drinksController = require('../controllers/DrinksController')
const authMiddleware = require('../middlewares/authMiddleware')
const rolesMiddleware = require('../middlewares/rolesMiddleware')

const drinksRouter = require('express').Router()


drinksRouter.get(
'/drinks',
 authMiddleware,
 rolesMiddleware(['MODERATOR', 'ADMIN']), 
 drinksController.getAll)

drinksRouter.get('/drinks/:id', drinksController.getOne)

drinksRouter.post('/drinks', (req, res, next) => {
    // console.log('joi works')
    next()
}, drinksController.addDrink)

drinksRouter.patch('/drinks/:id', drinksController.updateDrink)

drinksRouter.delete('/drinks/:id', drinksController.removeDrink)


 
module.exports = drinksRouter

// ['MODERATOR', 'ADMIN', 'CTO', 'EDITOR', 'USER']


