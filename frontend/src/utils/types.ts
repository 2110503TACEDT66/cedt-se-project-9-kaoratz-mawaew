import { z } from 'zod';

export const userCustomizeSchema = z.object({
    name: z.string().min(1 , "Username must not be blank"),
    email: z.string().email(),
    tel: z.string().min(1, "Phone number must not be blank")
});

export type TUserCustomSchema = z.infer<typeof userCustomizeSchema>;