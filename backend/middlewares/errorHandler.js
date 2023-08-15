
// errorHandler.js

module.exports = (error, req, res, next) => {
    console.error(error); // Log the error for debugging purposes
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      code: statusCode,
      message: error.message,
      stack: err.stack,
    });
  };


// module.exports = (err, req, res, next) => {
// // console.log(res.statusCode)
// const statusCode = res.statusCode || 500
// res.status(statusCode)
// res.json({
//     message: err.message,
//     stack: err.stack,
// })
    
// }