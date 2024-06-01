import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  amount: z.number().positive("Amount must be a positive number"),
  taxNumber: z.string().nonempty("Transaction number cannot be empty")
});
