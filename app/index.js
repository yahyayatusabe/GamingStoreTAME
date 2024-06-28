import express from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";
import * as database from "./database.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Inicializa express
const app = express();

console.log('El servidor se está iniciando...');
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

//Middlewares
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500"]
}));
app.use(morgan("dev"));
app.use(express.json());

//Rutas
async function ejecutarConsultaSQL(query) {
  try {
    const connection = await database.getConnection();
    await connection.query(query);
    return true; // Indica que la consulta se ejecutó correctamente
  } catch (error) {
    console.error("Error al ejecutar la consulta SQL:", error);
    throw error; // Propaga el error para manejarlo en el controlador de la ruta
  }
}
app.get("/productos", async (req,res) =>{
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from producto");
  res.json(result)
})
app.post("/carrito/comprar", async (req, res) => {
  if(req.body && req.body.length > 0){
    return res.sendStatus(200);
  }
  res.sendStatus(400)
})
app.get("/usuarios", async (req,res) =>{
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * from usuario");
  res.json(result)
})
app.post("/delete", async (req, res) => {
  const { id } = req.body; // Se espera que el cliente envíe el ID del producto a eliminar en el cuerpo de la solicitud

  // Verifica si se proporcionó un ID válido
  if (!id) {
      return res.status(400).json({ message: "Se requiere proporcionar un ID de producto válido" });
  }

  try {
      // Ejecuta la consulta SQL para marcar el producto como eliminado en la base de datos
      await ejecutarConsultaSQL(`UPDATE app_gamingstore.producto SET deleted = '1' WHERE (id = '${id}')`);

      // Envía una respuesta de éxito al cliente
      return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return res.status(500).json({ message: "Error interno del servidor al eliminar el producto" });
  }
});
app.post("/activar", async (req, res) => {
  const { id } = req.body; // Se espera que el cliente envíe el ID del producto a eliminar en el cuerpo de la solicitud

  // Verifica si se proporcionó un ID válido
  if (!id) {
      return res.status(400).json({ message: "Se requiere proporcionar un ID de producto válido" });
  }

  try {
      await ejecutarConsultaSQL(`UPDATE app_gamingstore.producto SET deleted = '0' WHERE (id = '${id}')`);

      // Envía una respuesta de éxito al cliente
      return res.status(200).json({ message: "Producto activado correctamente" });
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return res.status(500).json({ message: "Error interno del servidor al eliminar el producto" });
  }
});
app.post("/agregar-producto", async (req, res) => {
  const { nombre, precio, urlimagen } = req.body;

  // Validar los datos recibidos
  if (!nombre || !precio || !urlimagen) {
      return res.status(400).json({ message: "Por favor completa todos los campos." });
  }

  // Ejecutar la consulta SQL para agregar el producto
  try {
      await ejecutarConsultaSQL(`INSERT INTO app_gamingstore.producto (nombre, precio, urlImagen, deleted) VALUES ('${nombre}', '${precio}', '${urlimagen}', '0')`);

      // Envía una respuesta de éxito al cliente
      return res.status(200).json({ message: "Producto agregado correctamente" });
  } catch (error) {
      console.error("Error al agregar el producto:", error);
      return res.status(500).json({ message: "Error interno del servidor al agregar el producto" });
  }
});
app.post("/agregar-usuario", async (req, res) => {
  const { user, email, password } = req.body;

  // Validar los datos recibidos
  if (!user || !email || !password) {
      return res.status(400).json({ message: "Por favor completa todos los campos." });
  }

  // Ejecutar la consulta SQL para agregar el producto
  try {
      await ejecutarConsultaSQL(`INSERT INTO app_gamingstore.usuario (user, email, password) VALUES ('${user}', '${email}', '${password}')`);

      // Envía una respuesta de éxito al cliente
      return res.status(200).json({ message: "Usuario agregado correctamente" });
  } catch (error) {
      console.error("Error al agregar el usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor al agregar el usuario" });
  }
});


// Servidor
app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto", app.get("port"));
});

// Rutas
app.get("/error401", (req, res) => res.sendFile(path.join(__dirname, "/pages/error401.html")));
app.get("/prueba", (req, res) => res.sendFile(path.join(__dirname, "/pages/prueba.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/pages/index2.html")));
app.get("/login", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/login.html")));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, "/pages/register.html")));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin/admin.html")));
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
app.get("/cart", (req, res) => res.sendFile(path.join(__dirname, "/pages/cart.html")));
app.get("/compra-exitosa", (req, res) => res.sendFile(path.join(__dirname, "/pages/compra-exitosa.html")));
app.get("/adminagregar", authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, "/pages/admin/adminagregar.html")));

