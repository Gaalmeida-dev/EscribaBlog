import { ChartColumnBig, PenTool, SquareUser } from "lucide-react";
import React from "react";
import { LiaCommentSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden fixed top-[60px] left-0 md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[300px] p-10 space-y-2 h-[calc(100vh-60px)] z-10">
      <div className="pt-10 px-3 space-y-2">
        <NavLink
          to="/dashboard/perfil"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "text-gray-900 dark:text-gray-100 bg-transparent"} flex items-center gap-4 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <SquareUser size={28} className="shrink-0" />
          <span className="whitespace-nowrap">Perfil</span>
        </NavLink>

        <NavLink
          to="/dashboard/seu-blog"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "text-gray-900 dark:text-gray-100 bg-transparent"} flex items-center gap-4 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <ChartColumnBig size={28} className="shrink-0" />
          <span className="whitespace-nowrap">Seus Blogs</span>
        </NavLink>

        <NavLink
          to="/dashboard/comentarios"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "text-gray-900 dark:text-gray-100 bg-transparent"} flex items-center gap-4 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <LiaCommentSolid size={28} className="shrink-0" />
          <span className="whitespace-nowrap">Comentários</span>
        </NavLink>

        <NavLink
          to="/dashboard/escreva-blog"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "text-gray-900 dark:text-gray-100 bg-transparent"} flex items-center gap-4 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <PenTool size={28} className="shrink-0" />
          <span className="whitespace-nowrap">Crie um Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
