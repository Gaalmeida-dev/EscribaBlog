import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";

const Hero = () => {
  const heroImg = "/Remote-Team--Streamline-Manchester.png";

  return (
    <div className="px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[600px] my-10 md:my-0 gap-10">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore novidades Tecnológicas
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            {" "}
            Aqui você se mantém por dentro de artigos, tutoriais e soluções
            digitais.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <Link to="/cadastro">
              <Button className="text-lg">Faça parte</Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="px-6 py-3 text-lg border-gray-300"
              >
                Saiba mais
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Ilustração criativa"
            className="w-full max-w-[400px] md:max-w-[550px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
