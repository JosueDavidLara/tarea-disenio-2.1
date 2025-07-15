import { pool } from "../config/db.js";

export const getAllCategorias = async () => {
  const [rows] = await pool.query("SELECT * FROM categorias");
  return rows;
};

export const getCategoriaById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

export const createCategoria = async (nombre) => {
  const [result] = await pool.query(
    "INSERT INTO categorias (nombre) VALUES (?)",
    [nombre]
  );
  return { id: result.insertId, nombre };
};

export const updateCategoria = async (id, nombre) => {
  const [result] = await pool.query(
    "UPDATE categorias SET nombre = ? WHERE id = ?",
    [nombre, id]
  );
  return result.affectedRows > 0;
};

export const deleteCategoria = async (id) => {
  const [result] = await pool.query("DELETE FROM categorias WHERE id = ?", [
    id,
  ]);
  return result.affectedRows > 0;
};

export const categoriaTieneProductos = async (id) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS total FROM productos WHERE categoria_id = ?",
    [id]
  );
  return rows[0].total > 0;
};
