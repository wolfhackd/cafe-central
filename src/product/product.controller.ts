import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    StandardSchemaValidationPipe,
} from "@nestjs/common";
import { createProductSchema } from "./interfaces.js";
import type { CreateProductInput, Product } from "./interfaces.js";
import { ProductService } from "./product.service.js";

@Controller("/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct(
        @Body({
            schema: createProductSchema,
            pipes: [new StandardSchemaValidationPipe()],
        })
        body: CreateProductInput,
    ): Promise<Product> {
        return this.productService.createProduct(body);
    }

    @Get(":id")
    async findProductById(@Param("id") id: string): Promise<Product> {
        return this.productService.findProductById(id);
    }

    @Get()
    async findAllProducts(): Promise<Product[]> {
        return await this.productService.findAllProducts();
    }

    @Delete(":id")
    async deleteProductById(@Param("id") id: string): Promise<void> {
        await this.productService.deleteProductById(id);
    }
    
}