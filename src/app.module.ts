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
import { EmployeeController } from './employee/employee.controller.js';
import { EmployeeRepository } from './employee/employee.repository.js';
import { EmployeeService } from './employee/employee.service.js';
import { PasswordHasherModule } from './lib/PasswordHasher/bcrypt-password-hasher.module.js';

@Module({
  imports: [PasswordHasherModule],
  controllers: [AppController, CategoryController, ProductController, EmployeeController],
  providers: [
    AppService,
    CategoryService,
    ProductService,
    PrismaService,
    EmployeeService,
    CategoryRepository,
    ProductRepository,
    EmployeeRepository
  ],
})
export class AppModule {}
