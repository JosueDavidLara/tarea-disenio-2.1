import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  categoriaExiste,
  nombreProductoExiste,
} from "../models/producto.model.js";

import { productoSchema } from "../schemas/producto.schema.js";

export const listarProductos = async (req, res) => {
  const productos = await getAllProductos();
  res.json(productos);
};

export const obtenerProducto = async (req, res) => {
  const producto = await getProductoById(req.params.id);
  if (!producto)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(producto);
};

export const crearProducto = async (req, res) => {
  try {
    const datos = productoSchema.parse(req.body);

    const existeCategoria = await categoriaExiste(datos.categoria_id);
    if (!existeCategoria) {
      return res.status(400).json({ error: "La categoría no existe" });
    }

    const nombreDuplicado = await nombreProductoExiste(datos.nombre);
    if (nombreDuplicado) {
      return res
        .status(400)
        .json({ error: "Ya existe un producto con ese nombre" });
    }

    const nuevo = await createProducto(datos);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.errors?.[0]?.message });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const datos = productoSchema.parse(req.body);

    const existeCategoria = await categoriaExiste(datos.categoria_id);
    if (!existeCategoria) {
      return res.status(400).json({ error: "La categoría no existe" });
    }

    const nombreDuplicado = await nombreProductoExiste(
      datos.nombre,
      req.params.id
    );
    if (nombreDuplicado) {
      return res
        .status(400)
        .json({ error: "Ya existe otro producto con ese nombre" });
    }

    const actualizado = await updateProducto(req.params.id, datos);
    if (!actualizado)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.errors?.[0]?.message || "Error de validación" });
  }
};

export const eliminarProducto = async (req, res) => {
  const eliminado = await deleteProducto(req.params.id);
  if (!eliminado)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ mensaje: "Producto eliminado" });
};
