import z from "zod";

export const userRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  PhoneNo: z.string(),
  address: z.string(),
  password: z.string().min(6)
});