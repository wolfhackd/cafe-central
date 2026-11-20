import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CategoryModule } from './modules/category/category.module.js';
import { EmployeeModule } from './modules/employee/employee.module.js';
import { OrderItemModule } from './modules/orderItem/orderItem.module.js';
import { ProductModule } from './modules/product/product.module.js';

@Module({
  imports: [AuthModule, CategoryModule, EmployeeModule, OrderItemModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
