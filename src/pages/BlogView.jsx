import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import CommentBox from "@/components/CommentBox";
import RelatedArticles from "@/components/RelatedArticles";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { setBlogs } from "@/redux/blogSlice";
import { toast } from "sonner";

const calculateReadingTime = (html) => {
  const text = html?.replace(/<[^>]+>/g, "") || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return minutes < 1 ? 1 : minutes;
};

const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const { blogs } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const selectedBlog = blogs.find((b) => b._id === blogId);

  const [likesCount, setLikesCount] = useState(
    selectedBlog?.likes?.length || 0,
  );
  const [isLiked, setIsLiked] = useState(
    selectedBlog?.likes?.includes(user?._id) || false,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLikeOrDislike = async () => {
    try {
      const action = isLiked ? "descurtir" : "curtir";
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/${action}/${selectedBlog?._id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
        setLikesCount(updatedLikesCount);
        setIsLiked(!isLiked);

        const updatedBlogs = blogs.map((b) =>
          b._id === selectedBlog._id
            ? {
                ...b,
                likes: isLiked
                  ? b.likes.filter((id) => id !== user._id)
                  : [...b.likes, user._id],
              }
            : b,
        );
        dispatch(setBlogs(updatedBlogs));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao processar curtida");
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("pt-BR", options);
  };

  const handleShare = (id) => {
    const blogUrl = `${window.location.origin}/blogs/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: selectedBlog?.title,
          text: "Confira este blog incrível!",
          url: blogUrl,
        })
        .catch((err) => console.error("Erro ao compartilhar:", err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Link copiado para a área de transferência!");
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!selectedBlog) return null;

  const tags = selectedBlog.tags
    ? selectedBlog.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const readingTime = calculateReadingTime(selectedBlog.description);

  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={"/"}>
                <BreadcrumbLink>Início</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={"/blogs"}>
                <BreadcrumbLink>Blogs</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {selectedBlog.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => navigate(`/perfil/${selectedBlog.author?._id}`)}
            >
              <Avatar>
                <AvatarImage src={selectedBlog.author?.photoUrl} alt="Autor" />
                <AvatarFallback>Autor</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {selectedBlog.author?.firstName}{" "}
                  {selectedBlog.author?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedBlog.author?.occupation}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Publicado em {formatDate(selectedBlog.createdAt)} • {readingTime}{" "}
              min de leitura
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog?.thumbnail}
            alt="Imagem do Blog"
            className="w-full object-cover max-h-[500px]"
          />
          <p className="text-sm text-muted-foreground mt-2 italic">
            {selectedBlog.subtitle}
          </p>
        </div>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
        />

        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => navigate(`/pesquisar?q=${selectedBlog.category}`)}
            >
              {selectedBlog.category}
            </Badge>
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer"
                style={{ backgroundColor: "rgb(30, 255, 230)", color: "#0a0a0a" }}
                onClick={() => navigate(`/pesquisar?q=${tag}`)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLikeOrDislike}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                {isLiked ? (
                  <FaHeart size={"24"} className="text-red-600" />
                ) : (
                  <FaRegHeart size={"24"} />
                )}
                <span>{likesCount}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{comment.length} Comentários</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <RelatedArticles selectedBlog={selectedBlog} />
        <CommentBox selectedBlog={selectedBlog} />
      </div>
    </div>
  );
};

export default BlogView;