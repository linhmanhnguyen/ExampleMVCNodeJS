class ReturnResponseUtils {
    static returnResponse(statusCode, isSuccess, message, data = []) {

        if (data != []) {
            res.status(statusCode).json(
                {
                    "isSuccess": isSuccess,
                    "message": message,
                    "data": data
                }

            );
        }
        else {
            res.status(statusCode).json(
                {
                    "isSuccess": isSuccess,
                    "message": message,
                }

            );
        }
    }
}

module.exports = ReturnResponseUtils;