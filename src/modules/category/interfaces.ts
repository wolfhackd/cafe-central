import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export interface CategorySummary {
    id: string;
    name: string;
}

export interface CreateCategoryInterface {
    name: string;
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export interface DeleteCategoryInterface {
    id: string;
}

export class DeleteCategoryDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
