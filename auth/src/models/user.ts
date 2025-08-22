import mongoose from "mongoose";

interface UserAttrs {
  email: string;
  password: string;
}

const userShema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userShema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
