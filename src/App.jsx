import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blog.jsx";
import CreateBlog from "./pages/CreateBlog";
import Dashboard from "./pages/Dashboard";
import YourBlog from "./pages/YourBlog";
import BlogView from "./pages/BlogView";
import About from "./pages/About";
import Comments from "./pages/Comments";
import UpdateBlog from "./pages/UpdateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchList from "./pages/SearchList";
import PublicProfile from "./pages/PublicProfile";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/sobre",
        element: <About />,
      },
      {
        path: "/pesquisar",
        element: <SearchList />,
      },
      {
        path: "/blogs/:blogId",
        element: (
          <ProtectedRoute>
            <BlogView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
      {
        path: "/perfil/:userId",
        element: <PublicProfile />,
      },
      {
        path: "/cadastro",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/painel",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "escrever-blog",
        element: <CreateBlog />,
      },
      {
        path: "escrever-blog/:blogId",
        element: <UpdateBlog />,
      },
      {
        path: "meus-blogs",
        element: <YourBlog />,
      },
      {
        path: "comentarios",
        element: <Comments />,
      },
      {
        path: "perfil",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
