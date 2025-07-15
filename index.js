import express from "express";
import dotenv from "dotenv";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/productos", productoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
