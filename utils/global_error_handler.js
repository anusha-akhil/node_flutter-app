const globalErrorHandler =(err,req,res,next)=>{
    const err =new Error(`The api ${req.originalUrl} not found`,);
    err.status='fail';
    err.statusCode = HttpStatusCode.NOT_FOUND;
    next(err);
}

module.exports=globalErrorHandler;