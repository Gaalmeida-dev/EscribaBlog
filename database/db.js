import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conexão bem sucedida");
  } catch (error) {
    console.log("MongoDB ocorreu um erro ao conectar", error);
  }
};

export default connectDB;
