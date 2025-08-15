import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../types/user";
import { UserModel } from "../models/user";
import { hashPassword } from "../utils/sessions";
import { JWT_SECRET } from "../config/config";

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email });
  return user || null;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string } | null> => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return null;

  const token = sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User | null> => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return null;

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the user
  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
};
