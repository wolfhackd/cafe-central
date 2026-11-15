import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository.js";
import type { CreateProductInput, Product } from "./product.repository.interface.js";
import { CategoryRepository } from "../category/category.repository.js";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository
    ) {}

    async createProduct(input: CreateProductInput): Promise<Product> {
        if (!input.name || !input.description || !input.price || !input.categoryId || !input.imageUrl) {
            throw new BadRequestException("All fields are required");
        }
        const price = Number(input.price);
        if (!Number.isFinite(price) || price <= 0) {
            throw new BadRequestException("Price must be greater than zero");
        }
        
        // Aqui eu faço a validação da categoryID existir
        const category = await this.categoryRepository.findCategoryById(input.categoryId);
        if (!category) {
            throw new BadRequestException("Category ID does not exist");
        }
        return await this.productRepository.createProduct(input);
    }
}