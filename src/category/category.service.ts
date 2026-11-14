import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository.js';
import type { CategorySummary } from './category.repository.interface.js';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategories(): Promise<CategorySummary[]> {
        return await this.categoryRepository.findAllCategories();
    }

    async createCategory(name: string): Promise<CategorySummary[]> {
        if (!name || name.trim() === "") {
            throw new BadRequestException("name is required");
        }

        await this.categoryRepository.createCategory(name);
        return [...await this.categoryRepository.findAllCategories()];
    }

    async findCategoryById(id: string): Promise<CategorySummary | null> {
        if (!id) {
            throw new BadRequestException("id is required");
        }
        const category = await this.categoryRepository.findCategoryById(id);
        if (!category) {
            throw new BadRequestException("category not found");
        }
        return category;
    }

    async deleteCategoryById(id: string): Promise<void> {
        if (!id) {
            throw new BadRequestException("id is required");
        }
        try{
            const category = await this.findCategoryById(id);
            if (!category) {
                throw new BadRequestException("category not found");
            }
            await this.categoryRepository.deleteCategoryById(id);
        } catch (error) {
            throw new BadRequestException("category not found");
        }
    }
}
