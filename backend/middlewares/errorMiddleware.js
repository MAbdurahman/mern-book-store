export const notFoundMiddleware = (req, res, next) => {
   const error = new Error(`Not Found: ${req.originalUrl}`);
   res.status(404);
   next(error);
}

export const errorHandlerMiddleware = (err, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   const message = err.message;

   if (err.name === "CastError" && err.kind === "ObjectId") {
      res.status(404).json({ message: "Resource not found" });

   } else {
      res.status(statusCode).json({
         message,
         stack: err.stack,
      });
   }
}