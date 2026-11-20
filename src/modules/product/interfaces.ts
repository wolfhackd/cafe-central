import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreateProductDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    description: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @Matches(/^\d+(?:\.\d+)?$/, { message: 'Price must be a decimal number' })
    price: string;

    @IsUUID()
    categoryId: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}

export type CreateProductInput = CreateProductDto;

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl: string;
}