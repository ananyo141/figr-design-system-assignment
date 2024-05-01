import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(4).max(140),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const loginSchema = userSchema.pick({ email: true, password: true });
