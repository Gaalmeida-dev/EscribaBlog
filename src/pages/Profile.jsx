import React from "react";
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

const Profile = () => {
  return (
    <div className="pt-20 md:ml-[320px] md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={userLogo} className="object-cover" />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              mern stack developer
            </h1>
            <div className="flex gap-4 items-center">
              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <IoMdContacts className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">
              Bem-vindo!
            </h1>
            <p>
              <span className="font-semibold">Email :</span> exemplo@gmail.com
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>Sobre mim</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                accusamus eligendi similique excepturi veritatis, blanditiis
                aliquid cum doloribus autem modi numquam voluptate animi
                cupiditate? Ullam corporis blanditiis esse magnam sequi.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Editar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edite seu perfil
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Faça as mudanças desejadas e clique em salvar
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="name" className="mb-1">
                        Nome
                      </Label>
                      <Input
                        id="name"
                        name="firstName"
                        placeholder="Escreva seu nome..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="username" className="mb-1">
                        Sobrenome
                      </Label>
                      <Input
                        id="name"
                        name="lastName"
                        placeholder="Escreva seu sobrenome..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="github" className="mb-1">
                        Github
                      </Label>
                      <Input
                        id="github"
                        name="github"
                        placeholder="Insira a Url..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="instagram" className="mb-1">
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        placeholder="Insira a Url..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="linkedin" className="mb-1">
                        Linkedin
                      </Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="Insira a Url..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="contato" className="mb-1">
                        Contato
                      </Label>
                      <Input
                        id="contato"
                        name="contato"
                        placeholder="Insira meio de contato..."
                        className="text-gray-500"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="mb-1">Descrição</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      maxLength={500}
                      placeholder="Insira uma descrição"
                      className="text-gray-500 resize-none h-10 overflow-y-auto break-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="mb-1">Foto</Label>
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-700 cursor-pointer"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
