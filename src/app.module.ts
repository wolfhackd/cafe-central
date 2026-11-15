import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryController } from './category/category.controller.js';
import { CategoryService } from './category/category.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { CategoryRepository } from './category/category.repository.js';
import { ProductController } from './product/product.controller.js';
import { ProductRepository } from './product/product.repository.js';
import { ProductService } from './product/product.service.js';

@Module({
  imports: [],
  controllers: [AppController, CategoryController, ProductController],
  providers: [
    AppService,
    CategoryService,
    ProductService,
    PrismaService,
    CategoryRepository,
    ProductRepository,
  ],
})
export class AppModule {}
