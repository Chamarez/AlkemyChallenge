//error handling

const exceptionType = {
    unhandledException:{
        code: 200,
        message: "Unhandled exception",
        httpStatus: 500
    },
    notFound:{
        code: 300,
        message: "Not found",
        httpStatus: 404
    },
    badRequest:{
        code: 400,
        message: "Bad Request",
        httpStatus: 400
    },
    invalidToken:{
        code: 501,
        message: 'Invalid token'
    },

    budget:{

      notFound: {
        code: 2000,
        message: "Product dont found",
        httpStatus: 404
      },

      badRequest: {
        code: 2001,
        message: "missing mandatory parameters",
        httpStatus: 400
      },
    },
    // code of users 100
    users : {
        invalidPassword: {
            code: 100,
            message: "Wrong credentials",
            httpStatus: 401
        },
        cannotCreateUser: {
            code: 101,
            message: "User can not be created",
            httpStatus: 500
        },
        notFound: {
            code: 102,
            message: "User not found",
            httpStatus: 404
        },
        userExists: {
            code: 103,
            message: "The user is already registered",
            httpStatus: 400
        },
        emailExists: {
            code: 104,
            message: "The email is already registered",
            httpStatus: 400
        },
    },
    database: {
        entity: {
            canNotBeCreated:{
                code: 400,
                message: "Can not be create entity",
                httpStatus: 500
            }
        }
    }
}

module.exports = {
    exceptionType
}
