import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category, description, tags } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Título e categoria do blog são obrigatórios.",
      });
    }

    const file = req.file;
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }

    const blog = await Blog.create({
      title,
      category,
      description,
      tags: tags || "",
      thumbnail: thumbnail?.secure_url,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog criado com sucesso.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Falha ao criar o blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category, tags } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId).populate("author");
    if (!blog) {
      return res.status(404).json({
        message: "Blog não encontrado!",
      });
    }

    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      tags: tags || "",
      author: req.id,
      thumbnail: thumbnail?.secure_url,
    };
    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    res
      .status(200)
      .json({ success: true, message: "Blog atualizado com sucesso", blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar o blog",
      error: error.message,
    });
  }
};

export const getAllBlogs = async (_, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName photoUrl",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "userId",
          select: "firstName lastName photoUrl",
        },
      });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar blogs",
      error: error.message,
    });
  }
};

export const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "firstName lastName photoUrl" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "userId",
          select: "firstName lastName photoUrl",
        },
      });
    if (!blogs) {
      return res.status(404).json({
        message: "Blog não encontrado",
      });
    }
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Falha ao buscar blogs publicados",
    });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog não encontrado!",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "Publicado" : "Desativado";
    return res.status(200).json({
      success: true,
      message: `O blog está agora ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Falha ao atualizar o status",
    });
  }
};

export const getOwnBlogs = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({ message: "ID de usuário é obrigatório." });
    }

    const blogs = await Blog.find({ author: userId })
      .populate({
        path: "author",
        select: "firstName lastName photoUrl",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "userId",
          select: "firstName lastName photoUrl",
        },
      });

    if (!blogs) {
      return res.status(404).json({
        message: "Nenhum blog encontrado.",
        blogs: [],
        success: false,
      });
    }

    return res.status(200).json({ blogs, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar seus blogs", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog não encontrado" });
    }
    if (blog.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Não autorizado a excluir este blog",
      });
    }

    await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ postId: blogId });

    res
      .status(200)
      .json({ success: true, message: "Blog excluído com sucesso" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao excluir o blog",
      error: error.message,
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.id;
    const blog = await Blog.findById(blogId).populate({ path: "likes" });
    if (!blog)
      return res
        .status(404)
        .json({ message: "Blog não encontrado", success: false });

    await blog.updateOne({ $addToSet: { likes: userId } });

    return res
      .status(200)
      .json({ message: "Blog curtido", blog, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const dislikeBlog = async (req, res) => {
  try {
    const userId = req.id;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog)
      return res
        .status(404)
        .json({ message: "Blog não encontrado", success: false });

    await blog.updateOne({ $pull: { likes: userId } });

    return res
      .status(200)
      .json({ message: "Curtida removida", blog, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.id;

    const myBlogs = await Blog.find({ author: userId }).select("likes");
    const totalLikes = myBlogs.reduce(
      (acc, blog) => acc + (blog.likes?.length || 0),
      0,
    );

    res.status(200).json({
      success: true,
      totalBlogs: myBlogs.length,
      totalLikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Falha ao buscar o total de curtidas",
    });
  }
};
