import { CreateProductInput, Product } from "./interfaces";

export interface ProductRepositoryInterface {
    createProduct(input: CreateProductInput): Promise<Product>;
    findAllProducts(): Promise<Product[]>;
    findProductById(id:string): Promise<Product | null>;
    deleteProductById(id:string): Promise<boolean>;
}