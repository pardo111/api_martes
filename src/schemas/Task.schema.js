import { z } from "zod";

export const TaskSchema = z.object({
    titulo: z.string().min(3),
    descripcion: z.string().min(3),
    estado: z.string().min(3),
    user_id: z.number()
});
