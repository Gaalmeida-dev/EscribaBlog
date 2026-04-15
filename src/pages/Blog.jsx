import BlogCard from "@/components/BlogCard";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "@/redux/blogSlice";

export const Blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((store) => store.blog);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/blog/publicados`,
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

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold text-center pt-10">Nossos Blogs</h1>
        <hr
          className="w-24 text-center border-2 rounded-full"
          style={{ borderColor: "rgb(30, 255, 230)" }}
        />
      </div>
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
        {blogs?.map((item, index) => {
          return <BlogCard blog={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
