import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/pen-nib-svgrepo-com.svg";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="flex gap-3 items-center">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-3xl font-bold">Escriba</h1>
          </Link>
          <p className="mt-4 text-sm">
            Compartilhando ideias, tutoriais e novidades sobre desenvolvimento
            web e tecnologia.
          </p>
          <p className="mt-3 text-sm">Rio de Janeiro - Brasil</p>
          <p className="text-sm">Email: suporte@blog.com</p>
          <p className="text-sm">Telefone: (11)11111-1111</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Links Rápidos</h3>
          <ul className="mt-4 text-sm space-y-2">
            <Link to="/">
              <li>Início</li>
            </Link>
            <Link to="/blogs">
              <li>Blogs</li>
            </Link>
            <Link to="/sobre">
              <li>Sobre Nós</li>
            </Link>
            <Link to="/faq">
              <li>FAQs</li>
            </Link>
          </ul>
          <h3 className="text-xl font-semibold mt-6">Siga-nos</h3>
          <div className="flex space-x-4 mt-3 text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Fique por dentro</h3>
          <p className="mt-4 text-sm">
            Inscreva-se para receber ofertas especiais e atualizações
          </p>
          <form action="" className="mt-4 flex gap-2 items-center">
            <input
              type="email"
              placeholder="Seu endereço de e-mail"
              className="flex-1 min-w-0 p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold whitespace-nowrap"
              style={{ backgroundColor: "rgb(30, 255, 230)", color: "#111" }}
            >
              Assinar
            </button>
          </form>
          <div className="mt-6 flex justify-end">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-gray-500 hover:border-[rgb(30,255,230)] hover:text-[rgb(30,255,230)] transition-colors duration-200"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "rgb(30, 255, 230)" }}>Gabriela Almeida</span>.
          Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
