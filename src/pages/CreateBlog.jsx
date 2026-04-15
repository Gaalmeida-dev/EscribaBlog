import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBlogs } from "../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [input, setInput] = useState({
    title: "",
    category: "",
    tags: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", content);
    formData.append("category", input.category);
    formData.append("tags", input.tags);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://escribablog.onrender.com/api/v1/blog/criar",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message || "Blog criado com sucesso!");
        navigate("/painel/meus-blogs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao criar blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 md:ml-[320px] min-h-screen pb-10">
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Escrever Blog</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Título do seu blog"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Categoria</Label>
            <Select
              onValueChange={(value) => setInput({ ...input, category: value })}
            >
              <SelectTrigger className="w-full">
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
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Study">Estudos</SelectItem>
                  <SelectItem value="News">Novidades</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tags (separadas por vírgula)</Label>
            <Input
              type="text"
              name="tags"
              value={input.tags}
              onChange={changeEventHandler}
              placeholder="Ex: react, node, tutorial"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Conteúdo</Label>
            <div className="border border-gray-500 rounded-md overflow-hidden">
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                className="jodit_toolbar"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Imagem de Capa</Label>
            <Input type="file" accept="image/*" onChange={fileChangeHandler} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Publicando..." : "Publicar Blog"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
