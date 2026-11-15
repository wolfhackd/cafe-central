import { BadRequestException, StandardSchemaValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { ProductRepository } from './product.repository.js';
import type { Product } from './interfaces.js';
import { createProductSchema } from './interfaces.js';

describe('ProductController', () => {
    let controller: ProductController;
    let app: INestApplication;
    let createProduct: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
        createProduct = vi.fn();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService,
                {
                    provide: ProductRepository,
                    useValue: { createProduct },
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
});
