import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.route("/criar").post(isAuthenticated, singleUpload, createBlog);
router
  .route("/atualizar/:blogId")
  .put(isAuthenticated, singleUpload, updateBlog);
router.route("/publicar/:blogId").patch(isAuthenticated, togglePublishBlog);
router.route("/todos").get(getAllBlogs);
router.route("/publicados").get(getPublishedBlog);
router.route("/meus-blogs").get(isAuthenticated, getOwnBlogs);
router.route("/deletar/:id").delete(isAuthenticated, deleteBlog);
router.get("/curtir/:id", isAuthenticated, likeBlog);
router.get("/descurtir/:id", isAuthenticated, dislikeBlog);
router.get("/meus-blogs/curtidas", isAuthenticated, getMyTotalBlogLikes);

export default router;
