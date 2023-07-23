

module.exports = (err, req, res, next) => {
// console.log(res.statusCode)
const statusCode = res.statusCode || 500
res.status(statusCode)
res.json({
    message: err.message,
    stack: err.stack,
})
    
}