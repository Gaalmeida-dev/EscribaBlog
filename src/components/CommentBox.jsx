import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlogs } from "@/redux/blogSlice";
import { setComment } from "@/redux/commentSlice";
import { Edit, Trash2 } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CommentBox = ({ selectedBlog }) => {
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const { blogs } = useSelector((store) => store.blog);
  const [content, setContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const dispatch = useDispatch();

  const handleReplyClick = (commentId) => {
    setActiveReplyId(activeReplyId === commentId ? null : commentId);
    setReplyText("");
  };

  const changeEventHandler = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/comentario/todos/${selectedBlog._id}`,
        );
        dispatch(setComment(res.data.comments));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllComments();
  }, [selectedBlog._id, dispatch]);

  const commentHandler = async () => {
    if (!content.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/comentario/criar/${selectedBlog._id}`,
        { content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        dispatch(setComment(updatedCommentData));

        const updatedBlogData = blogs.map((p) =>
          p._id === selectedBlog._id
            ? { ...p, comments: updatedCommentData }
            : p,
        );
        dispatch(setBlogs(updatedBlogData));
        toast.success(res.data.message || "Comentário adicionado!");
        setContent("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar comentário");
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/comentario/deletar/${commentId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedCommentData = comment.filter(
          (item) => item._id !== commentId,
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message || "Comentário excluído");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir comentário");
    }
  };

  const editCommentHandler = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/comentario/editar/${commentId}`,
        { content: editedContent },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.data.success) {
        const updatedCommentData = comment.map((item) =>
          item._id === commentId ? { ...item, content: editedContent } : item,
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message || "Comentário atualizado");
        setEditingCommentId(null);
        setEditedContent("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar comentário");
    }
  };

  const likeCommentHandler = async (commentId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comentario/curtir/${commentId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        const updatedCommentList = comment.map((item) =>
          item._id === commentId ? res.data.updatedComment : item,
        );
        dispatch(setComment(updatedCommentList));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <Avatar>
          <AvatarImage src={user?.photoUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
      <div className="flex gap-3">
        <Textarea
          placeholder="Deixe um comentário..."
          className="bg-gray-100 dark:bg-gray-800"
          onChange={changeEventHandler}
          value={content}
        />
        <Button onClick={commentHandler}>
          <LuSend />
        </Button>
      </div>
      {comment.length > 0 && (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
          {comment.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src={item?.userId?.photoUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="mb-2 space-y-1 md:w-[400px]">
                    <h1 className="font-semibold">
                      {item?.userId?.firstName} {item?.userId?.lastName}{" "}
                      <span className="text-sm ml-2 font-light">
                        recentemente
                      </span>
                    </h1>
                    {editingCommentId === item?._id ? (
                      <>
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="mb-2 bg-gray-200 dark:bg-gray-700"
                        />
                        <div className="flex py-1 gap-2">
                          <Button
                            size="sm"
                            onClick={() => editCommentHandler(item._id)}
                          >
                            Salvar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCommentId(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p>{item?.content}</p>
                    )}
                    <div className="flex gap-5 items-center">
                      <div className="flex gap-2 items-center">
                        <div
                          className="flex gap-1 items-center cursor-pointer"
                          onClick={() => likeCommentHandler(item._id)}
                        >
                          {item.likes.includes(user?._id) ? (
                            <FaHeart fill="red" />
                          ) : (
                            <FaRegHeart />
                          )}
                          <span>{item.numberOfLikes}</span>
                        </div>
                      </div>
                      <p
                        onClick={() => handleReplyClick(item._id)}
                        className="text-sm cursor-pointer"
                      >
                        Responder
                      </p>
                    </div>
                  </div>
                </div>
                {user?._id === item?.userId?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[180px]">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCommentId(item._id);
                          setEditedContent(item.content);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => deleteCommentHandler(item._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              {activeReplyId === item?._id && (
                <div className="flex gap-3 w-full px-10 mt-2">
                  <Textarea
                    placeholder="Responda aqui..."
                    className="border-2 dark:border-gray-500 bg-gray-200 dark:bg-gray-700"
                    onChange={(e) => setReplyText(e.target.value)}
                    value={replyText}
                  />
                  <Button onClick={commentHandler}>
                    <LuSend />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
