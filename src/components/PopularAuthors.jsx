import axios from "axios";
import React, { useEffect, useState } from "react";
import userLogo from "../assets/user.svg";
import { useSelector } from "react-redux";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PopularAuthors = () => {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const fetchPopularAuthors = async () => {
    try {
      const res = await axios.get(
        `https://escribablog.onrender.com/api/v1/usuario/todos-usuarios`,
      );
      if (res.data.success) {
        setPopularAuthors(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularAuthors();
  }, []);

  const getContactLink = (contact) => {
    if (!contact) return "#";
    if (contact.includes("http")) return contact;
    const onlyNums = contact.replace(/\D/g, "");
    return `https://wa.me/${onlyNums}`;
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-3xl md:text-4xl font-bold pt-10">
            Autores Populares
          </h1>
          <hr
            className="w-24 text-center border-2 rounded-full"
            style={{ borderColor: "rgb(30, 255, 230)" }}
          />
        </div>
        <div className="flex items-center justify-around my-10 px-4 md:px-0">
          {popularAuthors?.slice(0, 4)?.map((author, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 items-center">
                <img
                  src={author.photoUrl || userLogo}
                  alt=""
                  className="rounded-full h-16 w-16 md:w-32 md:h-32 object-cover cursor-pointer"
                  onClick={() => setSelectedAuthor(author)}
                />
                <p
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/perfil/${author._id}`)}
                >
                  {author.firstName} {author.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog
        open={!!selectedAuthor}
        onOpenChange={() => setSelectedAuthor(null)}
      >
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-center">Perfil do Autor</DialogTitle>
          </DialogHeader>
          {selectedAuthor && (
            <div className="flex flex-col items-center gap-4 py-2">
              <img
                src={selectedAuthor.photoUrl || userLogo}
                alt=""
                className="rounded-full w-28 h-28 object-cover border-2"
              />
              <h2
                className="text-xl font-bold cursor-pointer hover:underline"
                onClick={() => {
                  setSelectedAuthor(null);
                  navigate(`/perfil/${selectedAuthor._id}`);
                }}
              >
                {selectedAuthor.firstName} {selectedAuthor.lastName}
              </h2>
              {selectedAuthor.occupation && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {selectedAuthor.occupation}
                </p>
              )}
              <div className="flex gap-4 items-center">
                {selectedAuthor.github && (
                  <a
                    href={selectedAuthor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </a>
                )}
                {selectedAuthor.instagram && (
                  <a
                    href={selectedAuthor.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </a>
                )}
                {selectedAuthor.linkedin && (
                  <a
                    href={selectedAuthor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </a>
                )}
                {selectedAuthor.contact && (
                  <a
                    href={getContactLink(selectedAuthor.contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoMdContacts className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                  </a>
                )}
              </div>
              {selectedAuthor.bio && (
                <div className="w-full flex flex-col gap-2">
                  <Label>Sobre mim</Label>
                  <p className="border dark:border-gray-600 p-4 rounded-lg w-full text-sm">
                    {selectedAuthor.bio}
                  </p>
                </div>
              )}
              {user?._id === selectedAuthor._id ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedAuthor(null);
                    navigate("/painel/perfil");
                  }}
                >
                  Editar Perfil
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedAuthor(null);
                    navigate(`/perfil/${selectedAuthor._id}`);
                  }}
                >
                  Ver Perfil Completo
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopularAuthors;
