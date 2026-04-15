import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;
    const { content } = req.body;

    const blog = await Blog.findById(postId);
    if (!content)
      return res
        .status(400)
        .json({ message: "O conteúdo é obrigatório", success: false });

    const comment = await Comment.create({
      content,
      userId: userId,
      postId: postId,
    });

    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);
    await blog.save();
    return res.status(201).json({
      message: "Comentário adicionado",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ postId: blogId })
      .populate({ path: "userId", select: "firstName lastName photoUrl" })
      .sort({ createdAt: -1 });

    if (!comments)
      return res.status(404).json({
        message: "Nenhum comentário encontrado para este blog",
        success: false,
      });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comentário não encontrado" });
    }
    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Não autorizado a excluir este comentário",
      });
    }

    const blogId = comment.postId;
    await Comment.findByIdAndDelete(commentId);

    await Blog.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ success: true, message: "Comentário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao excluir comentário",
      error: error.message,
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Não autorizado a editar este comentário",
      });
    }

    comment.content = content;
    comment.editedAt = new Date();

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comentário atualizado com sucesso",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "O comentário não pôde ser editado",
      error: error.message,
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const userId = req.id;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comentário não encontrado" });
    }

    const alreadyLiked = comment.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
      comment.numberOfLikes -= 1;
    } else {
      comment.likes.push(userId);
      comment.numberOfLikes += 1;
    }
    await comment.save();
    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Curtição removida" : "Comentário curtido",
      updatedComment: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Algo deu errado ao curtir o comentário",
      error: error.message,
    });
  }
};

export const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.id;

    const myBlogs = await Blog.find({ author: userId }).select("_id");
    const blogIds = myBlogs.map((blog) => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "Nenhum blog encontrado para este usuário.",
      });
    }

    const comments = await Comment.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Falha ao buscar comentários.",
    });
  }
};