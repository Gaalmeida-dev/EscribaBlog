import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Usuário não autenticado",
                success: false 
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Token inválido",
                success: false
            });
        }

        req.id = decode.userId; 
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro interno no servidor",
            success: false
        });
    }
}