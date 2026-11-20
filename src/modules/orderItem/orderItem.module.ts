import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { OrderItemController } from './orderItem.controller.js';
import { OrderItemRepository } from './orderItem.repository.js';

@Module({
  imports: [PrismaModule],
  controllers: [OrderItemController],
  providers: [OrderItemRepository],
})
export class OrderItemModule {}
