import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategorySummary, CreateCategoryDto, DeleteCategoryDto } from './interfaces.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorator/role.decorators.js';
import { Public } from '../auth/decorator/public.decorator.js';
import { Role } from '../auth/enums/role.enum.js';


@Controller("/category")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    @Public()
    async getCategories(): Promise<CategorySummary[]> {
        return await this.categoryService.getCategories();
    }
    
    @Post()
    @Roles(Role.ADMIN)
    async createCategory(@Body() body: CreateCategoryDto): Promise<CategorySummary[]> {
        return await this.categoryService.createCategory(body.name);
    }
    
    @Post("/delete")
    @Roles(Role.ADMIN)
    async deleteCategory(@Body() body: DeleteCategoryDto): Promise<void> {
        return await this.categoryService.deleteCategoryById(body.id);
    }
}