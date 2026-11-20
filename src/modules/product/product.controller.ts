import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    ValidationPipe,
} from "@nestjs/common";
import type { Product } from "./interfaces.js";
import { CreateProductDto } from "./interfaces.js";
import { ProductService } from "./product.service.js";

@Controller("/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct(
        @Body(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }))
        body: CreateProductDto,
    ): Promise<Product> {
        return this.productService.createProduct(body);
    }

    @Get(":id")
    async findProductById(
        @Param("id", new ParseUUIDPipe()) id: string,
    ): Promise<Product> {
        return this.productService.findProductById(id);
    }

    @Get()
    async findAllProducts(): Promise<Product[]> {
        return await this.productService.findAllProducts();
    }

    @Delete(":id")
    async deleteProductById(
        @Param("id", new ParseUUIDPipe()) id: string,
    ): Promise<void> {
        await this.productService.deleteProductById(id);
    }
    
}