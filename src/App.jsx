import React from "react";
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element:<><Navbar/> <Home/> </>
  },
  {
    path: "/sobre",
    element:<><Navbar/> <About/> </>
  },
  {
    path: "/blogs",
    element:<><Navbar/> <Blogs/> </>
  },
  {
    path: "/login",
    element:<><Navbar/> <Login/> </>
  },
  {
    path: "/logout",
    element:<><Navbar/> <Signup/> </>
  },


])

const App = () =>{
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  )
}

export default App