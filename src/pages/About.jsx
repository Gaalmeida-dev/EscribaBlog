import React from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiMongodb,
  SiRedux,
  SiTailwindcss,
  SiCloudinary,
  SiExpress,
  SiJsonwebtokens,
} from "react-icons/si";

const technologies = [
  { icon: <FaReact size={28} />, name: "React" },
  { icon: <FaNodeJs size={28} />, name: "Node.js" },
  { icon: <SiExpress size={28} />, name: "Express" },
  { icon: <SiMongodb size={28} />, name: "MongoDB" },
  { icon: <SiRedux size={28} />, name: "Redux" },
  { icon: <SiTailwindcss size={28} />, name: "Tailwind CSS" },
  { icon: <SiCloudinary size={28} />, name: "Cloudinary" },
  { icon: <SiJsonwebtokens size={28} />, name: "JWT" },
];

const About = () => {
  return (
    <div className="pt-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold dark:text-white">
            Sobre o Projeto
          </h1>
          <hr
            className="w-24 mx-auto border-2 rounded-full"
            style={{ borderColor: "rgb(30, 255, 230)" }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            O <span className="font-semibold">EscribaBlog</span> é um projeto
            acadêmico desenvolvido por{" "}
            <span
              style={{ color: "rgb(30, 255, 230)" }}
              className="font-semibold"
            >
              Gabriela Almeida
            </span>
            , com o objetivo de aplicar na prática os conceitos de
            desenvolvimento web full stack que aprendi no bootcamp da Generation
            Brasil.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md space-y-4">
          <h2 className="text-2xl font-bold dark:text-white">Arquitetura</h2>
          <p className="text-gray-600 dark:text-gray-300">
            O projeto segue a arquitetura{" "}
            <span className="font-semibold">MERN Stack</span> (MongoDB, Express,
            React e Node.js), separando claramente o frontend do backend. O
            backend expõe uma <span className="font-semibold">API REST</span>{" "}
            organizada por recursos: usuários, blogs e comentários, cada um com
            suas próprias rotas, controllers e models. O frontend consome essa
            API via <span className="font-semibold">Axios</span>, com estado
            global gerenciado pelo{" "}
            <span className="font-semibold">Redux Toolkit</span> e persistência
            via <span className="font-semibold">Redux Persist</span>.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md space-y-4">
          <h2 className="text-2xl font-bold dark:text-white">
            Lógica e Programação
          </h2>
          <ul className="text-gray-600 dark:text-gray-300 space-y-3 list-disc list-inside">
            <li>
              Autenticação segura com <span className="font-semibold">JWT</span>{" "}
              armazenado em cookies{" "}
              <span className="font-semibold">HttpOnly</span>, protegendo as
              rotas privadas no backend via middleware.
            </li>
            <li>
              Upload de imagens integrado ao{" "}
              <span className="font-semibold">Cloudinary</span>, com conversão
              para Data URI via <span className="font-semibold">Multer</span>{" "}
              antes do envio.
            </li>
            <li>
              Editor de texto rico com{" "}
              <span className="font-semibold">Jodit Editor</span> para criação e
              edição de blogs com suporte a HTML.
            </li>
            <li>
              Sistema de curtidas e comentários com atualizações em tempo real
              no cliente via Redux.
            </li>
            <li>
              Busca por categoria e palavra-chave com navegação via query params
              na URL.
            </li>
            <li>
              Interface responsiva e com suporte a{" "}
              <span className="font-semibold">dark mode</span>, controlado
              globalmente pelo Redux.
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md space-y-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Tecnologias Utilizadas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300"
              >
                <span style={{ color: "rgb(30, 255, 230)" }}>{tech.icon}</span>
                <p className="text-sm font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
