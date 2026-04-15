import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlogs } from "@/redux/blogSlice";

const UpdateBlog = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const params = useParams();
  const id = params.blogId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((store) => store.blog);
  const selectedBlog = blogs.find((item) => item._id === id);
  const [content, setContent] = useState(selectedBlog?.description || "");

  const [blogData, setBlogData] = useState({
    title: selectedBlog?.title || "",
    subtitle: selectedBlog?.subtitle || "",
    description: content,
    category: selectedBlog?.category || "",
    tags: selectedBlog?.tags || "",
    thumbnail: null,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedBlog?.thumbnail || "",
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("tags", blogData.tags);
    if (blogData.thumbnail) formData.append("file", blogData.thumbnail);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/atualizar/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message || "Blog atualizado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar o blog");
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/blog/publicar/${id}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsPublished(!isPublished);
        toast.success(res.data.message || "Status de publicação atualizado!");
        navigate(`/painel/meus-blogs`);
      } else {
        toast.error("Falha ao atualizar status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro na comunicação com o servidor");
    }
  };

  const deleteBlogHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/deletar/${id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedBlogs = blogs.filter((item) => item?._id !== id);
        dispatch(setBlogs(updatedBlogs));
        toast.success(res.data.message || "Blog removido com sucesso!");
        navigate("/painel/meus-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir");
    }
  };

  return (
    <div className="pb-10 px-3 pt-20 md:ml-[320px]">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
          <h1 className="text-4xl font-bold">Informações Básicas do Blog</h1>
          <p>
            Faça as alterações necessárias e clique em salvar ou publicar quando
            terminar.
          </p>
          <div className="space-x-2">
            <Button onClick={togglePublishStatus}>
              {selectedBlog?.isPublished ? "Desativar Publicação" : "Publicar"}
            </Button>
            <Button variant="destructive" onClick={deleteBlogHandler}>
              Remover Blog
            </Button>
          </div>
          <div className="pt-10">
            <Label>Título</Label>
            <Input
              type="text"
              placeholder="Digite o título"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Input
              type="text"
              placeholder="Digite o subtítulo"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label>Descrição</Label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              className="jodit_toolbar"
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <Select
              onValueChange={selectCategory}
              defaultValue={blogData.category}
              className="dark:border-gray-300"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="Web Development">
                    Desenvolvimento Web
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Marketing Digital
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photgraphy">Fotografia</SelectItem>
                  <SelectItem value="Cooking">Culinária</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tags</Label>
            <Input
              type="text"
              placeholder="Ex: react, javascript, frontend"
              name="tags"
              value={blogData.tags}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label>Capa (Thumbnail)</Label>
            <Input
              id="file"
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit dark:border-gray-300"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Capa do Blog"
              />
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Voltar
            </Button>
            <Button onClick={updateBlogHandler} disabled={loading}>
              {loading ? "Por favor, aguarde..." : "Salvar Alterações"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
