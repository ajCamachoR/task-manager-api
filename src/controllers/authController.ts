import { Request, Response } from "express";
import { loginUser, registerUser } from "../managers/userManager";
import { NODE_ENV } from "../config/config";

// User login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ token: user.token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// User registration
export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    if (!user) {
      return res.status(400).json({ message: "Registration failed" });
    }
    res.status(201).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// User logout
export const userLogout = async (req: Request, res: Response) => {
  try {
    // Since JWTs are stateless, to "logout" we typically clear the token on the client side.
    // If using cookies, clear the cookie. If using a token blacklist, add the token to it (not shown here).
    // Clear the JWT cookie if it exists
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};
