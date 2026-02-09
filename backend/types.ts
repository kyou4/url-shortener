import z from "zod"

export const urlSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z.string().min(3).max(1000),
  createdAt:z.date()
})
export type IUrlResponse = z.infer<typeof urlSchema>;