import mongoose from "mongoose";
import { PasswordService } from "../services/password.js";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Define the statics for the User model ex: User.build
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userShema.pre("save", async function (done) {
  // If the password is modified, we need to hash it
  if (this.isModified("password")) {
    const hashPassword = await PasswordService.toHash(this.get("password"));
    this.set("password", hashPassword);
  }
  done();
});

/**
 * Build a new User document
 * @param {UserAttrs} attrs - Object containing the required fields to build a new User document
 * @returns {UserDoc} - New User document
 */
userShema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userShema);

export { User };
