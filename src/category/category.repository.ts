import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { CategoryRepositoryInterface, CategorySummary } from "./category.repository.interface.js";


@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}

    async createCategory(name:string): Promise<string>{
       const category = await this.prisma.db.orm.public.Category.create({ name })
       return category.name;
    }

    async findAllCategories(): Promise<CategorySummary[]> {
        return await this.prisma.db.orm.public.Category
            .select("id", "name")
            .all();
    }

    async findCategoryById(id:string): Promise<CategorySummary | null> {
        const category = await this.prisma.db.orm.public.Category.where({ id:id }).select("id", "name").first();
        return category;
    }

    async deleteCategoryById(id:string): Promise<void> {
        await this.prisma.db.orm.public.Category.where({ id:id }).delete();
    }
}