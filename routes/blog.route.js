import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createBlog, updateBlog } from "../controllers/blog.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/criar").post(isAuthenticated, createBlog);
router.route("/atualizar/:id").put(isAuthenticated, singleUpload, updateBlog);

export default router;
