import { BadRequestException, StandardSchemaValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { ProductRepository } from './product.repository.js';
import { CategoryRepository } from '../category/category.repository.js';
import type { Product } from './interfaces.js';
import { createProductSchema } from './interfaces.js';

describe('ProductController', () => {
    let controller: ProductController;
    let app: INestApplication;
    let createProduct: ReturnType<typeof vi.fn>;
    let findProductById: ReturnType<typeof vi.fn>;
    let deleteProductById: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
        createProduct = vi.fn();
        findProductById = vi.fn();
        deleteProductById = vi.fn().mockResolvedValue(true);
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService,
                {
                    provide: ProductRepository,
                    useValue: { createProduct, findProductById, deleteProductById },
                },
                {
                    provide: CategoryRepository,
                    useValue: {
                        findCategoryById: vi.fn().mockResolvedValue({
                            id: '550e8400-e29b-41d4-a716-446655440000',
                            name: 'Coffee',
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('validates HTTP request bodies before calling the service', async () => {
        await request(app.getHttpServer())
            .post('/product')
            .send({
                name: '',
                description: 'Espresso',
                price: '2.50',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                imageUrl: 'https://example.com/coffee.jpg',
            })
            .expect(400);

        expect(createProduct).not.toHaveBeenCalled();
    });

    it('validates and normalizes a valid product body', async () => {
        const product: Product = {
            id: 'product-id',
            name: 'Coffee',
            description: 'Espresso',
            price: 2.5,
            categoryId: '550e8400-e29b-41d4-a716-446655440000',
            imageUrl: 'https://example.com/coffee.jpg',
        };
        createProduct.mockResolvedValue(product);

        const pipe = new StandardSchemaValidationPipe();
        const validatedBody = await pipe.transform(
            {
                name: ' Coffee ',
                description: ' Espresso ',
                price: '2.50',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                imageUrl: ' https://example.com/coffee.jpg ',
            },
            { type: 'body', schema: createProductSchema },
        );

        await expect(controller.createProduct(validatedBody)).resolves.toBe(product);
        expect(createProduct).toHaveBeenCalledWith({
            name: 'Coffee',
            description: 'Espresso',
            price: '2.50',
            categoryId: '550e8400-e29b-41d4-a716-446655440000',
            imageUrl: 'https://example.com/coffee.jpg',
        });
    });

    it('rejects malformed decimal strings in the request schema', async () => {
        const pipe = new StandardSchemaValidationPipe();

        await expect(
            pipe.transform(
                {
                    name: 'Coffee',
                    description: 'Espresso',
                    price: '12abc',
                    categoryId: '550e8400-e29b-41d4-a716-446655440000',
                    imageUrl: 'https://example.com/coffee.jpg',
                },
                { type: 'body', schema: createProductSchema },
            ),
        ).rejects.toThrow();

        expect(createProduct).not.toHaveBeenCalled();
    });

    it('rejects zero price in the service', async () => {
        const pipe = new StandardSchemaValidationPipe();
        const validatedBody = await pipe.transform(
            {
                name: 'Coffee',
                description: 'Espresso',
                price: '0.00',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                imageUrl: 'https://example.com/coffee.jpg',
            },
            { type: 'body', schema: createProductSchema },
        );

        await expect(controller.createProduct(validatedBody)).rejects.toBeInstanceOf(BadRequestException);
        expect(createProduct).not.toHaveBeenCalled();
    });

    it('returns a product by ID', async () => {
        const product: Product = {
            id: 'product-id',
            name: 'Coffee',
            description: 'Espresso',
            price: 2.5,
            categoryId: '550e8400-e29b-41d4-a716-446655440000',
            imageUrl: 'https://example.com/coffee.jpg',
        };
        findProductById.mockResolvedValue(product);

        await request(app.getHttpServer())
            .get('/product/product-id')
            .expect(200, product);
    });

    it('returns 404 when a product ID does not exist', async () => {
        findProductById.mockResolvedValue(null);

        await request(app.getHttpServer())
            .get('/product/missing-id')
            .expect(404);
    });

    it('deletes an existing product', async () => {
        await request(app.getHttpServer())
            .delete('/product/product-id')
            .expect(200);

        expect(deleteProductById).toHaveBeenCalledWith('product-id');
    });

    it('returns 404 when deleting a product ID that does not exist', async () => {
        deleteProductById.mockResolvedValue(false);

        await request(app.getHttpServer())
            .delete('/product/missing-id')
            .expect(404);
    });
});
