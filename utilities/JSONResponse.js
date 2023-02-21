class JSONResponse {
    static success(res, message = "success", data, status) {
       res.status(status ?? res.statusCode).json({
          status: status ?? res.statusCode,
          message,
          data,
       });
    }
 
    static error(res, message = "error", error, status) {
       res.status(status ?? res.statusCode).json({
          status: status ?? res.statusCode,
          message,
          error,
       });
    }
 }
 
 module.exports = { JSONResponse }; 