import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RelatedArticles = ({ selectedBlog }) => {
  const { blogs } = useSelector((store) => store.blog);
  const navigate = useNavigate();

  const selectedTags = selectedBlog?.tags
    ? selectedBlog.tags.split(",").map((t) => t.trim().toLowerCase())
    : [];

  const related = blogs
    .filter((b) => b._id !== selectedBlog._id && b.isPublished)
    .map((b) => {
      const bTags = b.tags
        ? b.tags.split(",").map((t) => t.trim().toLowerCase())
        : [];
      const tagMatches = bTags.filter((tag) => selectedTags.includes(tag)).length;
      const categoryMatch = b.category === selectedBlog.category ? 10 : 0;
      const score = categoryMatch + tagMatches;
      return { ...b, score };
    })
    .filter((b) => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {related.map((blog, index) => (
          <Card
            key={index}
            className="min-w-[260px] max-w-[260px] dark:bg-gray-800 dark:border-gray-700 flex-shrink-0 hover:shadow-lg transition-shadow"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-36 object-cover rounded-t-lg cursor-pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            />
            <CardContent className="p-4 space-y-2">
              <Badge variant="secondary" className="text-xs">
                {blog.category}
              </Badge>
              <h3 className="font-semibold text-sm line-clamp-2">
                {blog.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="px-0 text-xs"
                style={{ color: "rgb(30, 255, 230)" }}
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                Ler Mais →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;