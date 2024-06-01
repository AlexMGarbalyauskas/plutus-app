import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  amount: z.number().positive("Amount must be a positive number"),
  taxNumber: z.string().min(1, "Transaction number cannot be empty"),
});
