import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderItemRepository } from "./orderItem.repository.js";
import type { AddOrderItemDto, OrderItem, UpdateOrderItemDto } from "./interfaces.js";

@Injectable()
export class OrderItemService {
    constructor(private readonly orderItemRepository: OrderItemRepository) {}

    async addItemToOrder(orderId: string, input: AddOrderItemDto): Promise<OrderItem> {
        const result = await this.orderItemRepository.addItemToOrder(
            orderId,
            input.productId,
            input.quantity,
        );

        if (result.status === "order-not-found") {
            throw new NotFoundException("Order ID does not exist");
        }
        if (result.status === "order-not-editable") {
            throw new ConflictException("Only WAITING orders can be modified");
        }
        if (result.status === "product-not-found") {
            throw new NotFoundException("Product ID does not exist");
        }

        return result.item;
    }

    async updateOrderItem(
        orderId: string,
        itemId: string,
        input: UpdateOrderItemDto,
    ): Promise<OrderItem> {
        const result = await this.orderItemRepository.updateOrderItem(
            orderId,
            itemId,
            input.quantity,
        );

        if (result.status === "order-not-found") {
            throw new NotFoundException("Order ID does not exist");
        }
        if (result.status === "order-not-editable") {
            throw new ConflictException("Only WAITING orders can be modified");
        }
        if (result.status === "item-not-found") {
            throw new NotFoundException("Order item does not exist");
        }

        return result.item;
    }

    async removeOrderItem(orderId: string, itemId: string): Promise<void> {
        const result = await this.orderItemRepository.removeOrderItem(orderId, itemId);

        if (result.status === "order-not-found") {
            throw new NotFoundException("Order ID does not exist");
        }
        if (result.status === "order-not-editable") {
            throw new ConflictException("Only WAITING orders can be modified");
        }
        if (result.status === "item-not-found") {
            throw new NotFoundException("Order item does not exist");
        }
    }

    async deleteOrder(orderId: string): Promise<void> {
        const result = await this.orderItemRepository.deleteOrder(orderId);

        if (result.status === "order-not-found") {
            throw new NotFoundException("Order ID does not exist");
        }
        if (result.status === "order-not-editable") {
            throw new ConflictException("Only WAITING orders can be deleted");
        }
        if (result.status === "payment-exists") {
            throw new ConflictException("Orders with an associated payment cannot be deleted");
        }
    }
}
