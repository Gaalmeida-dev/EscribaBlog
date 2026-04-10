import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Escreva aqui sua Bio...",
    },
    occupation: {
      type: String,
      default: "Escreva aqui sua ocupação...",
    },
    photoUrl: {
      type: String,
      default: "",
    },
    instagram: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    contact: { type: String, default: "" },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
