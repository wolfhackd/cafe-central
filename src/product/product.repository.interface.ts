
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl: string;
}

export interface CreateProductInput {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    imageUrl: string;
}

export interface ProductRepositoryInterface {
    createProduct(input: CreateProductInput): Promise<Product>;
    // findAllProducts(): Promise<Product[]>;
    // findProductById(id:string): Promise<Product | null>;
    // deleteProductById(id:string): Promise<void>;
}