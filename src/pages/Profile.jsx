import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import userLogo from "../assets/user.svg";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { IoMdContacts } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../components/ui/input";
import { DialogFooter } from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    occupation: user?.occupation || "",
    bio: user?.bio || "",
    github: user?.github || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
    contact: user?.contact || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const getContactLink = (contact) => {
    if (!contact) return "#";
    if (contact.includes("http")) return contact;
    const onlyNums = contact.replace(/\D/g, "");
    return `https://wa.me/${onlyNums}`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);
    formData.append("linkedin", input.linkedin);
    formData.append("contact", input.contact);

    if (input?.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/usuario/perfil/atualizar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Ocorreu um erro");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-20 md:ml-[320px] md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage
                src={user?.photoUrl || userLogo}
                className="object-cover"
              />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "Ocupação"}
            </h1>
            <div className="flex gap-4 items-center">
              <Link to={user?.github || "#"} target="_blank">
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link to={user?.instagram || "#"} target="_blank">
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link to={user?.linkedin || "#"} target="_blank">
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link to={getContactLink(user?.contact)} target="_blank">
                <IoMdContacts className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">
              Bem-vindo, {user?.firstName || "Usuário"}!
            </h1>
            <p>
              <span className="font-semibold">Email :</span> {user?.email}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>Sobre mim</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg w-full">
                {user?.bio || "Que tal escrever um pouco sobre você?"}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Editar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edite seu perfil
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Faça as mudanças desejadas e clique em salvar
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Escreva seu nome..."
                          className="text-gray-500"
                          type="text"
                          value={input.firstName}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Escreva seu sobrenome..."
                          className="text-gray-500"
                          type="text"
                          value={input.lastName}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="occupation">Ocupação</Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          placeholder="Sua profissão..."
                          className="text-gray-500"
                          type="text"
                          value={input.occupation}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="github">Github</Label>
                        <Input
                          id="github"
                          name="github"
                          placeholder="Insira a Url..."
                          className="text-gray-500"
                          type="text"
                          value={input.github}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          placeholder="Insira a Url..."
                          className="text-gray-500"
                          type="text"
                          value={input.instagram}
                          onChange={changeEventHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="linkedin">Linkedin</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="Insira a Url..."
                          className="text-gray-500"
                          type="text"
                          value={input.linkedin}
                          onChange={changeEventHandler}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="contact">
                        Contato (Link ou Telefone)
                      </Label>
                      <Input
                        id="contact"
                        name="contact"
                        placeholder="Ex: https://meusite.com ou 11999999999"
                        className="text-gray-500"
                        type="text"
                        value={input.contact}
                        onChange={changeEventHandler}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bio">Descrição</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        maxLength={500}
                        placeholder="Insira uma descrição"
                        className="text-gray-500 resize-none h-20 overflow-y-auto break-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
                        value={input.bio}
                        onChange={changeEventHandler}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="file">Foto</Label>
                      <input
                        id="file"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-700 cursor-pointer"
                        onChange={changeFileHandler}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {loading ? (
                      <Button className="w-full my-4" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando
                      </Button>
                    ) : (
                      <Button type="submit" className="w-full my-4">
                        Salvar
                      </Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
