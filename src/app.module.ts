import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryController } from './category/category.controller.js';
import { CategoryService } from './category/category.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { CategoryRepository } from './category/category.repository.js';

@Module({
  imports: [],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService, PrismaService, CategoryRepository],
})
export class AppModule {}
