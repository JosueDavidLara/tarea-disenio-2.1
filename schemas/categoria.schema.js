import { z } from "zod";

export const categoriaSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
});
