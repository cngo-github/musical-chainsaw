import { z } from "zod";

export const createStartupFormSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().min(1),
  pitch: z.string().min(10),
});
