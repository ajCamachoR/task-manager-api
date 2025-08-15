import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Auth route works!");
});

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.get("/logout", authController.userLogout);

export default router;
