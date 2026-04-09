import mongoose from "mongoose";

const userScehma = new mongoose.Schema(
  {
    primeiroNome: {
      type: String,
      required: true,
    },
    ultimoNome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Escreva aqui sua Bio...",
    },
    ocupação: {
      type: String,
      default: "Escreva aqui sua ocupação...",
    },
    fotoUrl: {
      type: String,
      default: "",
    },
    instagram: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
  },
  { timestamps: true },
);

export const User = mongoose.model("Usuário", userScehma);
