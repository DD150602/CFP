import { UnknownError } from '../schemas/error.schema.js'
export default function errorMiddleware (error, req, res, next) {
  if (typeof error.validationError === 'function') {
    res.status(error.status).json(error.validationError())
  } else {
    const unknownError = new UnknownError({
      message: error.message || 'Unknown error',
      name: error.name || 'Unknown error',
      statusCode: error.statusCode || 500
    })
    res.status(unknownError.statusCode).json(unknownError.validationError())
  }
}
