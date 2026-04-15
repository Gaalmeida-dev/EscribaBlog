import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";

const TotalProperty = () => {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const dispatch = useDispatch();

  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/meus-blogs`,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comentario/meus-blogs/comentarios`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setTotalComments(res.data.totalComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalLikes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/meus-blogs/curtidas`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setTotalLikes(res.data.totalLikes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnBlogs();
    getTotalComments();
    getTotalLikes();
  }, []);

  const stats = [
    {
      title: "Total de Visualizações",
      value: "24.8K",
      icon: Eye,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total de Blogs",
      value: blog.length,
      icon: BarChart3,
      change: "+4%",
      trend: "up",
    },
    {
      title: "Comentários",
      value: totalComments,
      icon: MessageSquare,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Curtidas",
      value: totalLikes,
      icon: ThumbsUp,
      change: "+7%",
      trend: "up",
    },
  ];

  return (
    <div className="md:p-10 p-4">
      <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
        {stats.map((stat) => (
          <Card key={stat.title} className="w-full dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change} desde o mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TotalProperty;
