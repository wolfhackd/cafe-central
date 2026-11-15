import {
    Body,
    Controller,
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
}