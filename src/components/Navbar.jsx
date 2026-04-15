import { Link, useNavigate } from "react-router-dom";
import logoImage from "@/assets/pen-nib-svgrepo-com.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BookMarkedIcon, LogOut, PenTool, Search, User } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiaCommentSolid } from "react-icons/lia";
import userLogo from "../assets/user.svg";
import { useState } from "react";

export const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `https://escribablog.onrender.com/api/v1/usuario/sair`,
        { withCredentials: true },
      );

      if (response.data.success) {
        dispatch(setUser(null));
        toast.success(response.data.message || "Sessão encerrada");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Erro ao sair";
      toast.error(errorMessage);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/pesquisar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        <div className="flex gap-7 items-center">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <img
                src={logoImage}
                alt="Logo"
                className="w-7 h-7 md:w-10 md:h-10"
              />
              <h1 className="font-bold text-3xl md:text-4xl">EscribaBlog</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <Button className="absolute right-0 top-0" onClick={handleSearch}>
              <Search />
            </Button>
          </div>
        </div>
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <Link to="/">
              <li>Início</li>
            </Link>
            <Link to="/sobre">
              <li>Sobre</li>
            </Link>
            <Link to="/blogs">
              <li>Blogs</li>
            </Link>
          </ul>
          <div className="flex items-center gap-2">
            <Button onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>
            {user ? (
              <div className="ml-7 flex gap-3 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <Avatar>
                        <AvatarImage src={user?.photoUrl || userLogo} />
                        <AvatarFallback>
                          {user?.firstName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-bold">
                      <div className="flex flex-col space-y-1">
                        <span>Minha conta</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/painel/perfil")}
                        className="flex items-center gap-2"
                      >
                        <User size={18} />
                        <span>Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/painel/meus-blogs")}
                        className="flex items-center gap-2"
                      >
                        <BookMarkedIcon size={18} />
                        <span>Meus Blogs</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/painel/comentarios")}
                        className="flex items-center gap-2"
                      >
                        <LiaCommentSolid size={18} />
                        <span>Comentários</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/painel/escrever-blog")}
                        className="flex items-center gap-2"
                      >
                        <PenTool size={18} />
                        <span>Escreva um blog</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      <span className="font-semibold">Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="ml-7 md:flex gap-2">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to="/cadastro">
                  <Button>Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
