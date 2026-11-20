import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import type { Product } from "./interfaces.js";
import { CreateProductDto } from "./interfaces.js";
import { ProductService } from "./product.service.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Public } from "../auth/decorator/public.decorator.js";
import { Roles } from "../auth/decorator/role.decorators.js";
import { Role } from "../auth/enums/role.enum.js";

@Controller("/product")
@UseGuards(JwtAuthGuard, RolesGuard)
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
    @Public()
    async findProductById(
        @Param("id", new ParseUUIDPipe()) id: string,
    ): Promise<Product> {
        return this.productService.findProductById(id);
    }
    
    @Get()
    @Public()
    async findAllProducts(): Promise<Product[]> {
        return await this.productService.findAllProducts();
    }

    @Delete(":id")
    @Roles(Role.ADMIN)
    async deleteProductById(
        @Param("id", new ParseUUIDPipe()) id: string,
    ): Promise<void> {
        await this.productService.deleteProductById(id);
    }
    
}