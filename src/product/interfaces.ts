import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
    price: z.string().trim().regex(/^\d+(?:\.\d+)?$/),
    categoryId: z.string().uuid(),
    imageUrl: z.string().trim().min(1),
}).strict();

export type CreateProductInput = z.infer<typeof createProductSchema>;

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl: string;
}