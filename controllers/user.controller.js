import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "E-mail inválido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Este e-mail já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Conta criada com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falha ao registrar",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "E-mail ou senha incorretos",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: `Bem-vindo(a) de volta, ${user.firstName}`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falha ao fazer login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "Sessão encerrada com sucesso.",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      firstName,
      lastName,
      occupation,
      bio,
      instagram,
      facebook,
      linkedin,
      github,
      contact,
    } = req.body;
    const file = req.file;

    let photoUrl;
    if (file) {
      const fileUri = getDataUri(file);
      let cloudResponse = await cloudinary.uploader.upload(fileUri);
      photoUrl = cloudResponse.secure_url;
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
        success: false,
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (occupation) user.occupation = occupation;
    if (instagram) user.instagram = instagram;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (bio) user.bio = bio;
    if (contact) user.contact = contact;
    if (photoUrl) user.photoUrl = photoUrl;

    await user.save();
    return res.status(200).json({
      message: "Perfil atualizado com sucesso",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falha ao atualizar perfil",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Lista de usuários obtida com sucesso",
      total: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Falha ao buscar usuários",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "firstName lastName photoUrl")
      .populate("following", "firstName lastName photoUrl");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao buscar usuário" });
  }
};

export const followUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const userId = req.id;

    if (targetId === userId) {
      return res
        .status(400)
        .json({ success: false, message: "Você não pode seguir a si mesmo" });
    }

    const target = await User.findById(targetId);
    const me = await User.findById(userId);

    if (!target || !me) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    if (target.followers.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Você já segue este usuário" });
    }

    await target.updateOne({ $addToSet: { followers: userId } });
    await me.updateOne({ $addToSet: { following: targetId } });

    return res
      .status(200)
      .json({ success: true, message: "Usuário seguido com sucesso" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao seguir usuário" });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const userId = req.id;

    const target = await User.findById(targetId);
    const me = await User.findById(userId);

    if (!target || !me) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    await target.updateOne({ $pull: { followers: userId } });
    await me.updateOne({ $pull: { following: targetId } });

    return res
      .status(200)
      .json({ success: true, message: "Você deixou de seguir este usuário" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao deixar de seguir" });
  }
};
