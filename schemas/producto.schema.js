import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  precio: z.number().positive("El precio debe ser mayor que 0"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  disponible: z.boolean().optional(),
  categoria_id: z.number().int("El ID de categoría debe ser un número entero"),
});
