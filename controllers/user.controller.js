import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos precisam ser preenchidos",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "A senha precisa ter no mínimo 6 caracteres",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Esse email já está cadastrado",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      primeiroNome: firstName,
      ultimoNome: lastName,
      email,
      senha: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Conta criada com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falha em registrar",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Senha ou email incorretos",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Que bom lhe ter de volta, ${user.primeiroNome}!`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falha em logar",
    });
  }
};

export const logout = async (__dirname, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout feito com sucesso",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
  } catch (error) {}
};
