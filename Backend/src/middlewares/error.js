// Not Found Error Middleware
const notFound = (req, res, next)=>{
    const error = new Error(`End Poind Not Found - ${req.originalUrl}`)
    next(error)
}


// Error Handler Middleware
const errorHandler = (err, req, res, next)=>{
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV ===  "Production" ? null : err.stack
    });
}

module.exports = {
    errorHandler,
    notFound,
}