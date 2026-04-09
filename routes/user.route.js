import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/registrar").post(register);
router.route("/logar").post(login);
router.route("/logout").get(logout);

export default router;
