import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { CategoryModule } from '../category/category.module.js';
import { ProductController } from './product.controller.js';
import { ProductRepository } from './product.repository.js';
import { ProductService } from './product.service.js';

@Module({
  imports: [CategoryModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
