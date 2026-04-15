import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlogs } from "@/redux/blogSlice";
import { Edit, Eye, Trash2, Globe, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((store) => store.blog);

  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(
        `https://escribablog.onrender.com/api/v1/blog/meus-blogs`,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setBlogs(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://escribablog.onrender.com/api/v1/blog/deletar/${id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedBlogs = blogs.filter((item) => item?._id !== id);
        dispatch(setBlogs(updatedBlogs));
        toast.success(res.data.message || "Blog excluído com sucesso");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir");
    }
  };

  const togglePublishHandler = async (id) => {
    try {
      const res = await axios.patch(
        `https://escribablog.onrender.com/api/v1/blog/publicar/${id}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedBlogs = blogs.map((item) =>
          item._id === id ? { ...item, isPublished: !item.isPublished } : item,
        );
        dispatch(setBlogs(updatedBlogs));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao alterar publicação");
    }
  };

  useEffect(() => {
    getOwnBlogs();
  }, []);

  const formatDate = (index) => {
    const date = new Date(blogs[index].createdAt);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>Uma lista dos seus blogs recentes.</TableCaption>
            <TableHeader className="overflow-x-auto">
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto">
              {blogs?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-20 rounded-md hidden md:block"
                    />
                    <h1
                      className="hover:underline cursor-pointer"
                      onClick={() => navigate(`/blogs/${item._id}`)}
                    >
                      {item.title}
                    </h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.isPublished ? (
                      <Badge
                        style={{
                          backgroundColor: "rgb(30, 255, 230)",
                          color: "#111",
                        }}
                      >
                        Publicado
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-gray-400 border-gray-500"
                      >
                        Rascunho
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuItem
                          onClick={() => togglePublishHandler(item._id)}
                        >
                          {item.isPublished ? (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Tornar Rascunho
                            </>
                          ) : (
                            <>
                              <Globe className="mr-2 h-4 w-4" />
                              Publicar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/painel/escrever-blog/${item._id}`)
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => deleteBlogHandler(item._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;
