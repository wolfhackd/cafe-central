import { Body, Controller, Get, Injectable, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service.js";
import { Order } from "./interfaces.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Roles } from "../auth/decorator/role.decorators.js";
import { Role } from "../auth/enums/role.enum.js";
import { Public } from "../auth/decorator/public.decorator.js";




@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post('create')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async createOrder(): Promise<Order>{
        return this.orderService.createOrder()
    }
    
    @Get('findOpenOrders')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async findOpenOrders(): Promise<Order[]> {
        return this.orderService.findOpenOrders();
    }

    @Get("/:orderId")
    @Public()
    async findOrderById(@Param("orderId") orderId: string): Promise<Order | null> {
        return this.orderService.findOrderById(orderId);
    }
    
}