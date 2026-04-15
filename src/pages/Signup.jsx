import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setLoading } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/usuario/cadastro`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Erro de conexão com o servidor";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const auth = "/auth.jpg";

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block w-1/2">
        <img
          src={auth}
          alt="Autenticação"
          className="h-[700px] w-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Criar uma conta
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Insira os seguintes dados para completar a ação
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label>Primeiro Nome</Label>
                  <Input
                    type="text"
                    placeholder="Escreva seu nome..."
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex-1">
                  <Label>Último Nome</Label>
                  <Input
                    type="text"
                    placeholder="Escreva seu sobrenome..."
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Insira seu endereço eletrônico..."
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Label>Senha</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha..."
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Por favor, aguarde...
                  </>
                ) : (
                  "Cadastre-se"
                )}
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Já tem uma conta?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Clique aqui
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
