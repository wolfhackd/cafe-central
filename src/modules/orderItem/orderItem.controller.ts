import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    ParseUUIDPipe,
    Post,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Role } from "../auth/enums/role.enum.js";
import { Roles } from "../auth/decorator/role.decorators.js";
import { AddOrderItemDto, UpdateOrderItemDto } from "./interfaces.js";
import type { OrderItem } from "./interfaces.js";
import { OrderItemService } from "./orderItem.service.js";

@Controller("order")
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    @Post(":orderId/items")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async addItemToOrder(
        @Param("orderId", new ParseUUIDPipe()) orderId: string,
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        )
        body: AddOrderItemDto,
    ): Promise<OrderItem> {
        return this.orderItemService.addItemToOrder(orderId, body);
    }

    @Patch(":orderId/items/:itemId")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async updateOrderItem(
        @Param("orderId", new ParseUUIDPipe()) orderId: string,
        @Param("itemId", new ParseUUIDPipe()) itemId: string,
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        )
        body: UpdateOrderItemDto,
    ): Promise<OrderItem> {
        return this.orderItemService.updateOrderItem(orderId, itemId, body);
    }

    @Delete(":orderId/items/:itemId")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async removeOrderItem(
        @Param("orderId", new ParseUUIDPipe()) orderId: string,
        @Param("itemId", new ParseUUIDPipe()) itemId: string,
    ): Promise<void> {
        await this.orderItemService.removeOrderItem(orderId, itemId);
    }

    @Delete(":orderId")
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async deleteOrder(@Param("orderId", new ParseUUIDPipe()) orderId: string): Promise<void> {
        await this.orderItemService.deleteOrder(orderId);
    }
}
