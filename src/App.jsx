import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navbar } from "@/components/Navbar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import YourBlog from "./pages/YourBlog";
import Comments from "./pages/Comments";
import CreateBlog from "./pages/CreateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/sobre",
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Blogs />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />

        <Dashboard />
      </>
    ),
    children: [
      {
        path: "perfil",
        element: <Profile />,
      },
      {
        path: "seu-blog",
        element: <YourBlog />,
      },
      {
        path: "comentarios",
        element: <Comments />,
      },
      {
        path: "escreva-blog",
        element: <CreateBlog />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
