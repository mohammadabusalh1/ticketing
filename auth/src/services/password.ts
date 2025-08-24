import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const SALT_LENGTH = 16;

export class PasswordService {
  static async toHash(password: string) {
    const salt = randomBytes(SALT_LENGTH).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${buf.toString("hex")}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [salt, key] = storedPassword.split(":");
    if (!salt) {
      throw new Error("Invalid stored password format");
    }
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === key;
  }
}
