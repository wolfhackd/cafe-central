import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategorySummary, CreateCategoryDto, DeleteCategoryDto } from './interfaces.js';


@Controller("/category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async getCategories(): Promise<CategorySummary[]> {
        return await this.categoryService.getCategories();
    }

    @Post()
    async createCategory(@Body() body: CreateCategoryDto): Promise<CategorySummary[]> {
        return await this.categoryService.createCategory(body.name);
    }

    @Post("/delete")
    async deleteCategory(@Body() body: DeleteCategoryDto): Promise<void> {
        return await this.categoryService.deleteCategoryById(body.id);
    }
}