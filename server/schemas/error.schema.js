const ErrorFactory = () => {
  return class BusinesError extends Error {
    constructor (error) {
      super(error.message)
      this.name = error.name
      this.status = error.statusCode
    }

    validationError () {
      return {
        name: this.name,
        status: this.status,
        message: this.message
      }
    }
  }
}

export const NoData = ErrorFactory()
export const CorsNotAllowed = ErrorFactory()
export const UnknownError = ErrorFactory()
