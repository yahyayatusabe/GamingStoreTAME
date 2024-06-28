import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS  // Tu contraseña de correo electrónico o una contraseña de aplicación
    }
});

let usuariosAdmin = []; // Variable para almacenar los usuarios administradores

async function login(req, res) {
    console.log('Login attempt:', req.body);
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        // Obtener información de todos los usuarios desde la API
        const response = await fetch('http://localhost:4000/usuarios');
        const usuariosbd = await response.json();

        // Filtrar usuarios administradores (admin === 1)
        usuariosAdmin = usuariosbd.filter(usuario => usuario.admin === 1);

        // Buscar el usuario por nombre de usuario
        const usuarioARevisar = usuariosAdmin.find(usuario => usuario.user === user);

        if (!usuarioARevisar) {
            return res.status(400).send({ status: "Error", message: "Error durante el login, revisa los datos." });
        }

        // Comparar la contraseña hasheada almacenada con la proporcionada por el usuario
        const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password);

        console.log('Password match:', loginCorrecto);

        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante el login, revisa los datos." });
        }

        // Generar token de autenticación
        const token = jsonwebtoken.sign(
            { user: usuarioARevisar.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // Opciones de la cookie
        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        };

        // Establecer la cookie en la respuesta
        res.cookie("jwt", token, cookieOption);
        console.log('User logged in successfully:', usuarioARevisar.user);

        // Enviar respuesta exitosa
        res.send({ status: "ok", message: "Usuario loggeado correctamente", redirect: "/admin" });
    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function register(req, res) {
    console.log('Datos recibidos en el servidor:', req.body); // Log para mostrar los datos en la consola del servidor

    try {
        const { user, password, email } = req.body;

        if (!user || !password || !email) {
            return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
        }

        // Obtener información de todos los usuarios
        const response = await fetch('http://localhost:4000/usuarios');
        const usuariosbd = await response.json();

        console.log('Usuarios obtenidos:', usuariosbd); // Validación por consola

        // Comprobar si el usuario ya existe comparando los correos electrónicos
        const usuarioRevisar = usuariosbd.find(usuario => usuario.email === email);
        if (usuarioRevisar) {
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
        }

        const salt = bcryptjs.genSaltSync(3);
        const hashPassword = await bcryptjs.hash(password, salt);

        const nuevoUsuario = {
            user,
            email,
            password: hashPassword
        };

        console.log('Usuario a registrar:', nuevoUsuario); // Validación por consola

        // Crear y almacenar el nuevo usuario
        await fetch('http://localhost:4000/agregar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
        });

        // Enviar correo de notificación
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registro exitoso',
            html: `
            <!DOCTYPE html>
            <html lang="es">
              <style>
                html {
                    background-color: #e5e5f7;
                    opacity: 0.7;
                    background-image:  linear-gradient(135deg, #f7a345 25%, transparent 25%), linear-gradient(225deg, #f7a345 25%, transparent 25%), linear-gradient(45deg, #f7a345 25%, transparent 25%), linear-gradient(315deg, #f7a345 25%, #e5e5f7 25%);
                    background-position:  40px 0, 40px 0, 0 0, 0 0;
                    background-size: 80px 80px;
                    background-repeat: repeat;
                    }
                body{
                  max-width: 600px;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: auto;
                  background-color: rgb(229, 255, 246);
                  padding: 40px;
                  border-radius: 4px;
                  margin-top: 10px;
                }
              </style>
              <body>
                <img src="https://github.com/yahyayatusabe/imagenes-app_gamingstore/blob/main/logo.png?raw=true" alt="Logo" id="logo" style="height: 120px;">
                <h1>Verificación de correo electrónico - gamingstore.com</h1>
                <p>Se ha creado una cuenta en gamingstore.com con este correo electrónico.</p>
                <p>Si esta cuenta no fue creada por usted, desestime este correo.</p>
                <p>Si usted creó la cuenta, entonces verifique la cuenta <a href="http://localhost:4000/" target="_blank" rel="noopener noreferrer">haciendo click aquí</a>.</p>
                <p><strong>Información de registro:</strong></p>
                <ul>
                  <li><strong>Nombre de usuario:</strong> ${user}</li>
                  <li><strong>Correo electrónico:</strong> ${email}</li>
                </ul>
                <p><strong>Yahya</strong></p>
                <p>GamingStore TAME</p>
              </body>
            </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error enviando correo:', error);
            } else {
                console.log('Correo enviado:', info.response);
            }
        });

        return res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.user} agregado`, redirect: "/" });
    } catch (error) {
        console.error('Error en el registro:', error);
        return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

export const methods = {
    login,
    register
};

// Función para obtener los usuarios administradores
export function obtenerUsuariosAdmin() {
    return usuariosAdmin.map(usuario => ({
        user: usuario.user,
        password: usuario.password,
        email: usuario.email
    }));
}
