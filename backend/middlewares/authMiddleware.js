
// authMiddleware
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

   try {
    const [tokenType, token] = req.headers.authorization.split(' ')
    if(tokenType === 'Bearer' && token) {

        const decoded  = jwt.verify(token, 'pizza')
        // console.log('decoded', decoded)
        req.user = decoded
        next()
    }
    }
    catch (error) {
    res.status(401).json({
        code: 401,
        message: error.message,
    })
   }
    
}

// decoded {
//     friends: [ 'Den', 'Max', 'Valera' ],
//     id: '64d91973270ec094ed7a0e08',
//     iat: 1691950515,
//     exp: 1692036915
//   }