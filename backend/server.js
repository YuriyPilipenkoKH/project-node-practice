// server.js

const path = require('path')
const configPath = path.join(__dirname, '..', 'config', '.env')
const express = require('express')
require('colors') 
const {engine} = require('express-handlebars')
const connectDb  = require('../config/connectDb')
const errorHandler = require('./middlewares/errorHandler')
const asyncHandler = require('express-async-handler')
const UsersSchema = require('./models/usersModel')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const authMiddleware = require('./middlewares/authMiddleware')
const rolesSchema = require('./models/rolesModel')
const sendEmail = require('./services/sendEmail')


console.log(require('dotenv').config({path: configPath}))
// console.log(process.env.PORT)
// console.log(process.env.DB_HOST)

const app = express()

app.use(express.static('public'));

// set template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'backend/views');

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about');
  });
  
app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
app.post('/sent', async (req, res) => {
    // res.send(req.body);
    res.render('sent', {
      message: 'Contact form successfully sent',
      name: req.body.userName,
      email: req.body.userEmail,
    });
  
    await sendEmail(req.body);
  });
  

app.use('/api/v1', require('./routes/drinksRoutes') )

app.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  app.get('/signin', (req, res) => {
    res.render('signin');
  });
  

app.post('/register', asyncHandler( async (req, res)=> {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Provide all fields')
    }

    const candidate = await UsersSchema.findOne({  email  })
    if(candidate) {
        res.status(400)
        throw new Error('User already exists')
    }

    const hashPassword  = bcrypt.hashSync(password, 5)
    // console.log(hashPassword)

    const roles = await rolesSchema.findOne({ value: 'USER' })

    const user = await UsersSchema.create({
        ...req.body,
        password: hashPassword,
        roles: [roles.value]
     }) 

    //  res.status(201).json({
    //     code:201,
    //     data: {
    //         email: user.email
    //     }
    //  })
    res.render('register');


}) )

app.post('/login', asyncHandler( async (req, res)=> {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Provide all fields')
    }

    const user = await UsersSchema.findOne({  email  })
    // console.log('user:',user)

    if(!user ) {
        res.status(404)
        throw new Error('User not found')
    }

   
  const isValidPassword = bcrypt.compareSync(password, user?.password)
    
    // console.log('isValidPassword:', isValidPassword)

    if( !isValidPassword) {
        res.status(400)
        throw new Error('Invalid  password')
    }

    const token = generateToken({
        friends: ['Den', 'Max', 'Valera'] ,
        id: user._id ,
        roles: user.roles
    })
    console.log('token', token)

    user.token = token 
    await user.save()

    // res.status(201).json({
    //     code:201,
    //     data: {
    //         email: user.email,
    //         token: user.token,
    //     }
    //  })
    res.render('register');

}) )

app.get('/logout', authMiddleware,  asyncHandler( async (req, res)=> {
    // console.log('req.user.id', req.user.id)
const { id } = req.user

const user  = await UsersSchema.findById(id)
user.token = null
await user.save()

res.status(200).json({
    code:200, 
    data: {
        email: user.email,
        message: 'Logout success'
    }
 })


}) )

function generateToken(data) {
    const payload = {...data}
    return jwt.sign(payload, 'pizza', {expiresIn: '24 h'})
}

app.use('*', (req, res, next) => {
    res.render('notfound');
  });

app.use(errorHandler)

connectDb()

app.listen(process.env.PORT, () => {
console.log(`server is running on port: ${process.env.PORT}`.green.bold.italic)
})



