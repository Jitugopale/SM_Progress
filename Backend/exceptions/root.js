
export class HttpException extends Error{
    constructor(message,errorCode,statusCode,errors){
        super(message)

        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

//Error codes

export const ErrorCodes = {
    "USER_NOT_FOUND":1001,
    "USER_ALREADY_EXISTS":1002,
    "ALL_FEILDS_REQUIRED":1003,
    "UNAUTHORIZED":1004,
    "INVALID_PASSWORD":1005,
    "PHONE_NUMBER_INVALID":1006,
    "INTERNAL_SERVER_ERROR":2001,
    "UNPROCESSABLE_ENTITY":2002

    //add error codes here
}