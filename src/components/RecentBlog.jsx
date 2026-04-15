import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { setBlogs } from "../redux/blogSlice";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { category: "Blogging" },
  { category: "Desenvolvimento Web" },
  { category: "Marketing Digital" },
  { category: "Tech" },
  { category: "Study" },
  { category: "News" },
];

const RecentBlog = () => {
  const { blogs } = useSelector((store) => store.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          `https://escribablog.onrender.com/api/v1/blog/publicados`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublishedBlogs();
  }, [dispatch]);

  const recentBlogs = [...(blogs || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const totalPages = Math.ceil(recentBlogs.length / 2);
  const prev = () => setCurrent((c) => (c === 0 ? totalPages - 1 : c - 1));
  const next = () => setCurrent((c) => (c === totalPages - 1 ? 0 : c + 1));
  const visibleBlogs = recentBlogs.slice(current * 2, current * 2 + 2);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold pt-10">Blogs Recentes</h1>
        <hr
          className="w-24 text-center border-2 rounded-full"
          style={{ borderColor: "rgb(30, 255, 230)" }}
        />
      </div>
      <div className="max-w-7xl mx-auto flex gap-6 px-4 md:px-0 mt-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visibleBlogs.map((item, index) => (
              <BlogCardList key={index} blog={item} />
            ))}
          </div>
          <div className="flex items-center justify-between px-1">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gray-400 dark:border-gray-500 hover:border-[rgb(30,255,230)] hover:text-[rgb(30,255,230)] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {current + 1} / {totalPages}
            </span>
            <button
              onClick={next}
              className="p-2 rounded-full border border-gray-400 dark:border-gray-500 hover:border-[rgb(30,255,230)] hover:text-[rgb(30,255,230)] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="bg-white hidden md:block dark:bg-gray-700 w-[350px] p-5 rounded-md self-start">
          <h1 className="text-2xl font-semibold">Categorias populares</h1>
          <div className="my-5 flex flex-wrap gap-3">
            {categories.map((item, index) => (
              <Badge
                onClick={() => navigate(`/pesquisar?q=${item.category}`)}
                key={index}
                className="cursor-pointer"
              >
                {item.category}
              </Badge>
            ))}
          </div>
          <h1 className="text-xl font-semibold">Assine a Newsletter</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Receba as últimas postagens e atualizações direto no seu e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
            <Input
              type="email"
              placeholder="Seu endereço de e-mail"
              className="flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-300"
            />
            <Button>Assinar</Button>
          </div>
          <div className="mt-7">
            <h2 className="text-xl font-semibold mb-3">Sugestões de Leitura</h2>
            <ul className="space-y-3">
              {[
                {
                  title: "10 Dicas para Dominar o React",
                  q: "Desenvolvimento Web",
                },
                { title: "Entendendo Tailwind CSS", q: "Desenvolvimento Web" },
                {
                  title: "Como melhorar seu SEO em 2026",
                  q: "Marketing Digital",
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => navigate(`/pesquisar?q=${item.q}`)}
                  className="text-sm dark:text-gray-100 hover:underline cursor-pointer"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
