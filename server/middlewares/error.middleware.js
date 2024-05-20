export default function errorMiddleware (error, req, res, next) {
  let errorObject
  if (typeof error.validationError === 'function') {
    errorObject = error.validationError()
  } else {
    errorObject = {
      message: 'Unknown error',
      name: 'Unknown error',
      statusCode: 500
    }
  }
  res.status(errorObject.status).json(errorObject)
}
