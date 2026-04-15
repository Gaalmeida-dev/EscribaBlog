import express from "express";
import {
  getAllUsers,
  getUserById,
  login,
  logout,
  register,
  updateProfile,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/cadastro").post(register);
router.route("/login").post(login);
router.route("/sair").get(logout);
router
  .route("/perfil/atualizar")
  .put(isAuthenticated, singleUpload, updateProfile);
router.get("/todos-usuarios", getAllUsers);
router.get("/:id", getUserById);
router.post("/seguir/:id", isAuthenticated, followUser);
router.post("/deixar-seguir/:id", isAuthenticated, unfollowUser);

export default router;
