import { CustomError } from "./custom-error.js";
import type { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    /* Example without Object.setPrototypeOf:

    const err = new RequestValidationError([]);
    console.log(err instanceof RequestValidationError); // ❌ might be false

    With Object.setPrototypeOf:

    const err = new RequestValidationError([]);
    console.log(err instanceof RequestValidationError); // ✅ true */
    Object.setPrototypeOf(this, RequestValidationError.prototype); // this only to make typeof work with correct prototype
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: (error as any).path };
    });
  }
}
