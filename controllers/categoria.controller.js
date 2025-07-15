import {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  categoriaTieneProductos,
} from "../models/categoria.model.js";

import { categoriaSchema } from "../schemas/categoria.schema.js";

export const listarCategorias = async (req, res) => {
  const categorias = await getAllCategorias();
  res.json(categorias);
};

export const obtenerCategoria = async (req, res) => {
  const categoria = await getCategoriaById(req.params.id);
  if (!categoria)
    return res.status(404).json({ error: "Categoría no encontrada" });
  res.json(categoria);
};

export const crearCategoria = async (req, res) => {
  try {
    const datos = categoriaSchema.parse(req.body);
    const nueva = await createCategoria(datos.nombre);
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);

    // 🚫 Error de duplicado en MySQL
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Ya existe una categoría con ese nombre" });
    }

    // ❌ Error de validación con Zod
    if (err.errors) {
      return res
        .status(400)
        .json({ error: err.errors?.[0]?.message || "Error de validación" });
    }

    // 🧯 Error inesperado
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarCategoria = async (req, res) => {
  try {
    const datos = categoriaSchema.parse(req.body);
    const actualizada = await updateCategoria(req.params.id, datos.nombre);
    if (!actualizada)
      return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ mensaje: "Categoría actualizada" });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.errors?.[0]?.message || "Error de validación" });
  }
};

export const eliminarCategoria = async (req, res) => {
  const tieneProductos = await categoriaTieneProductos(req.params.id);
  if (tieneProductos) {
    return res.status(400).json({
      error: "No se puede eliminar una categoría con productos asociados",
    });
  }

  const eliminada = await deleteCategoria(req.params.id);
  if (!eliminada)
    return res.status(404).json({ error: "Categoría no encontrada" });
  res.json({ mensaje: "Categoría eliminada" });
};
