import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("pt-BR");

  const tags = blog.tags
    ? blog.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all">
      <img
        src={blog.thumbnail}
        alt=""
        className="rounded-lg w-full object-cover max-h-[180px]"
      />
      <p className="text-sm mt-2">
        Por {blog.author?.firstName} | {formattedDate}
      </p>
      <h2 className="text-xl font-semibold mt-1">{blog.title}</h2>
      <h3 className="text-gray-500 mt-1 text-sm">{blog.subtitle}</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {blog.category && (
          <Badge
            variant="secondary"
            className="cursor-pointer text-xs"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pesquisar?q=${blog.category}`);
            }}
          >
            {blog.category}
          </Badge>
        )}
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer text-xs"
            style={{ backgroundColor: "rgb(30, 255, 230)", color: "#0a0a0a" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pesquisar?q=${tag}`);
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className="mt-4 px-4 py-2 rounded-lg text-sm"
      >
        Ler Mais
      </Button>
    </div>
  );
};

export default BlogCardList;