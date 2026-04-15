import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlogCardList from "@/components/BlogCardList";
import axios from "axios";
import { toast } from "sonner";

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  const { blogs } = useSelector((store) => store.blog);
  const { user: loggedUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("publicacoes");
  const [filterOrder, setFilterOrder] = useState("recentes");
  const [following, setFollowing] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const normalize = (str) => str?.toLowerCase().trim() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(
          `https://escribablog.onrender.com/api/v1/usuario/todos-usuarios`,
          { withCredentials: true },
        );
        if (usersRes.data.success) {
          setAllUsers(usersRes.data.users);
        }
      } catch (error) {
        console.log(error);
      }

      if (!loggedUser) return;
      try {
        const meRes = await axios.get(
          `https://escribablog.onrender.com/api/v1/usuario/${loggedUser._id}`,
          { withCredentials: true },
        );
        if (meRes.data.success) {
          setFollowing(meRes.data.user.following?.map((f) => f._id) || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [query]);

  const filteredBlogs = blogs
    .filter((b) => {
      if (!b.isPublished) return false;
      const q = normalize(query);
      return (
        normalize(b.title).includes(q) ||
        normalize(b.category).includes(q) ||
        normalize(b.tags).includes(q) ||
        normalize(b.subtitle).includes(q)
      );
    })
    .sort((a, b) => {
      if (filterOrder === "recentes")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const filteredUsers = allUsers.filter((u) => {
    const q = normalize(query);
    return (
      normalize(u.firstName).includes(q) ||
      normalize(u.lastName).includes(q) ||
      normalize(`${u.firstName} ${u.lastName}`).includes(q)
    );
  });

  const handleFollowToggle = async (authorId) => {
    if (!loggedUser) {
      navigate("/login");
      return;
    }
    const isAlreadyFollowing = following.includes(authorId);
    try {
      const action = isAlreadyFollowing ? "deixar-seguir" : "seguir";
      const res = await axios.post(
        `https://escribablog.onrender.com/api/v1/usuario/${action}/${authorId}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) {
        setFollowing((prev) =>
          isAlreadyFollowing
            ? prev.filter((id) => id !== authorId)
            : [...prev, authorId],
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao processar");
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Resultados para:{" "}
            <span style={{ color: "rgb(30, 255, 230)" }}>"{query}"</span>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Tipo</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={filterType}
                onValueChange={setFilterType}
              >
                <DropdownMenuRadioItem value="publicacoes">
                  Publicações
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="usuarios">
                  Usuários
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={filterOrder}
                onValueChange={setFilterOrder}
              >
                <DropdownMenuRadioItem value="recentes">
                  Mais recentes
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="antigas">
                  Mais antigas
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filterType === "publicacoes" && (
          <>
            {filteredBlogs.length === 0 ? (
              <p className="text-muted-foreground text-center mt-20">
                Sem resultados para "{query}"
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <BlogCardList key={index} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}

        {filterType === "usuarios" && (
          <>
            {filteredUsers.length === 0 ? (
              <p className="text-muted-foreground text-center mt-20">
                Sem resultados para "{query}"
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredUsers.map((u, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl border bg-white dark:bg-gray-800"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => navigate(`/perfil/${u._id}`)}
                    >
                      <Avatar>
                        <AvatarImage src={u.photoUrl} />
                        <AvatarFallback>
                          {u.firstName?.[0]}
                          {u.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {u.firstName} {u.lastName}
                        </p>
                        {u.occupation && (
                          <p className="text-sm text-muted-foreground">
                            {u.occupation}
                          </p>
                        )}
                      </div>
                    </div>
                    {loggedUser?._id !== u._id && (
                      <Button
                        size="sm"
                        variant={
                          following.includes(u._id) ? "outline" : "default"
                        }
                        style={
                          following.includes(u._id)
                            ? {}
                            : {
                                backgroundColor: "rgb(30, 255, 230)",
                                color: "#0a0a0a",
                              }
                        }
                        onClick={() => handleFollowToggle(u._id)}
                      >
                        {following.includes(u._id) ? "Seguindo" : "Seguir"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchList;
