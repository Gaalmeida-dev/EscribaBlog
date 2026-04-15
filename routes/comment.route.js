import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnMyBlogs,
  getCommentsOfPost,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/criar/:id", isAuthenticated, createComment);
router.delete("/deletar/:id", isAuthenticated, deleteComment);
router.put("/editar/:id", isAuthenticated, editComment);
router.route("/todos/:id").get(getCommentsOfPost);
router.get("/curtir/:id", isAuthenticated, likeComment);
router.get("/meus-blogs/comentarios", isAuthenticated, getAllCommentsOnMyBlogs);

export default router;
