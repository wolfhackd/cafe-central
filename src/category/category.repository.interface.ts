
import type { CategorySummary } from './interfaces.js';

export interface CategoryRepositoryInterface {
    createCategory(name:string): Promise<string>;
    findCategoryById(id:string): Promise<CategorySummary | null>;
    findAllCategories(): Promise<CategorySummary[]>;
    deleteCategoryById(id:string): Promise<void>;
}