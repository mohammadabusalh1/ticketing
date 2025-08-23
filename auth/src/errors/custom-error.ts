/**
 * Represents parent class for all custom errors.
 * This class define common properties and methods for custom errors.
 */

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
}
