import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { obtenerUsuariosAdmin } from "../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next) {
    const logueado = revisarCookie(req);
    if (logueado) {
        return next();
    } else {
        return res.redirect("/error401");
    }
}

function soloPublico(req, res, next) {
    const logueado = revisarCookie(req);
    if (!logueado) {
        return next();
    } else {
        return res.redirect("/error401");
    }
}

function revisarCookie(req) {
    try {
        if (!req.headers.cookie) {
            return false; // Si no hay cookies en la solicitud, devuelve falso
        }

        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);

        // Obtener usuarios administradores
        const usuariosAdmin = obtenerUsuariosAdmin();

        // Verificar si el usuario decodificado está en la lista de administradores
        const usuarioARevisar = usuariosAdmin.find(usuario => usuario.user === decodificada.user);

        if (!usuarioARevisar) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error al revisar la cookie:', error);
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico
};
