import { CustomError } from "./custom-error.js";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public error: string) {
    super();
    /* Example without Object.setPrototypeOf:

    const err = new RequestValidationError([]);
    console.log(err instanceof RequestValidationError); // ❌ might be false

    With Object.setPrototypeOf:

    const err = new RequestValidationError([]);
    console.log(err instanceof RequestValidationError); // ✅ true */
    Object.setPrototypeOf(this, BadRequestError.prototype); // this only to make typeof work with correct prototype
  }

  serializeErrors() {
    return [
      {
        message: this.error,
        field: (this.error as any).path,
      },
    ];
  }
}
