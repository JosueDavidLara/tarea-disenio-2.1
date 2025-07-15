import { pool } from "../config/db.js";

// Validación de existencia de categoría
export const categoriaExiste = async (categoria_id) => {
  const [rows] = await pool.query("SELECT id FROM categorias WHERE id = ?", [
    categoria_id,
  ]);
  return rows.length > 0;
};

export const getAllProductos = async () => {
  const [rows] = await pool.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
  `);
  return rows;
};

export const getProductoById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
  return rows[0];
};

export const createProducto = async (data) => {
  const { nombre, precio, descripcion, disponible = true, categoria_id } = data;
  const [result] = await pool.query(
    `INSERT INTO productos (nombre, precio, descripcion, disponible, categoria_id)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, precio, descripcion, disponible, categoria_id]
  );
  return { id: result.insertId, ...data };
};

export const updateProducto = async (id, data) => {
  const { nombre, precio, descripcion, disponible = true, categoria_id } = data;
  const [result] = await pool.query(
    `UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ? WHERE id = ?`,
    [nombre, precio, descripcion, disponible, categoria_id, id]
  );
  return result.affectedRows > 0;
};

export const deleteProducto = async (id) => {
  const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const nombreProductoExiste = async (nombre, excluirId = null) => {
  let query = "SELECT * FROM productos WHERE nombre = ?";
  let params = [nombre];

  if (excluirId !== null) {
    query += " AND id != ?";
    params.push(excluirId);
  }

  const [rows] = await pool.query(query, params);
  return rows.length > 0;
};
