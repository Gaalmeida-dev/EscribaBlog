import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/data.Uri.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Nome e Título são necessários",
      });
    }
    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog criado com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Não foi possível criar o Blog",
      success: false,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog não encontrado",
        success: false,
      });
    }

    const updateData = { title, subtitle, category, description };

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.thumbnail = cloudResponse.secure_url;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Blog atualizado com sucesso",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Um erro ocorreu ao atualizar o Blog",
    });
  }
};
