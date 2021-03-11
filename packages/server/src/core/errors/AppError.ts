class AppError extends Error {
  public readonly statusCode: number
  public readonly customError = true

  constructor(message: string, statusCode: number = 400) {
    super(message)

    this.name = AppError.name
    this.statusCode = statusCode

    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export { AppError }
