import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { CreateProductInput, Product } from "./interfaces.js";
import type { ProductRepositoryInterface } from "./product.repository.interface.js";




@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
    constructor(private readonly prisma : PrismaService){}

    async createProduct(input: CreateProductInput): Promise<Product> {
        const res = await this.prisma.db.orm.public.Product.create(input);
        const product: Product = {
            id: res.id,
            name: res.name,
            description: res.description,
            price: parseFloat(res.price),
            categoryId: res.categoryId,
            imageUrl: res.imageUrl
        };
        return product;
    }

    async findAllProducts(): Promise<Product[]> {
        const res = await this.prisma.db.orm.public.Product.all();
        const products: Product[] = res.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            categoryId: item.categoryId,
            imageUrl: item.imageUrl
        }));
        return products;
    }

    async findProductById(id: string): Promise<Product | null> {
        const res = await this.prisma.db.orm.public.Product.first({ id });

        const product: Product | null = res ? {
            id: res.id,
            name: res.name,
            description: res.description,
            price: parseFloat(res.price),
            categoryId: res.categoryId,
            imageUrl: res.imageUrl
        } : null;
        return product;
    }
}