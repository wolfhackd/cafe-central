
export interface CategorySummary {
    id: string;
    name: string;
}

export interface CategoryRepositoryInterface {
    createCategory(name:string): Promise<string>;
    findCategoryById(id:string): Promise<CategorySummary | null>;
    findAllCategories(): Promise<CategorySummary[]>;
    deleteCategoryById(id:string): Promise<void>;
}