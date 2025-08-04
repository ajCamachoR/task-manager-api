import { Schema, model } from "mongoose";
import { User } from "../types/user";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>("User", userSchema);
