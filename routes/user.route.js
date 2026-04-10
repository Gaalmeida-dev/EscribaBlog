import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/registrar").post(register);
router.route("/logar").post(login);
router.route("/logout").get(logout);
router
  .route("/perfil/atualizar")
  .put(isAuthenticated, singleUpload, updateProfile);

export default router;
