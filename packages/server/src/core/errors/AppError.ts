class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message)

    this.name = AppError.name
    this.statusCode = statusCode
  }
}

export { AppError }
