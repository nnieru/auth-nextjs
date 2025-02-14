import { HttpCode } from "./http_code";

export interface ErrorResponse {
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}

class ApiError extends Error {
  public readonly errorCode: string;
  public readonly httpCode: number;

  constructor(errorCode: string, httpCode: number, message?: string) {
    super(message);
    this.errorCode = errorCode;
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    // This line is necessary to maintain the correct prototype chain
    // when extending built-in classes like Error in TypeScript.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super("NOT_FOUND", HttpCode.NotFound, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad request") {
    super("BAD_REQUEST", HttpCode.BadRequest, message);
  }
}

export { NotFoundError, BadRequestError };
