import { Body, Get, Injectable, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./interfaces";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorator/role.decorators";
import { Role } from "../auth/enums/role.enum";
import { Public } from "../auth/decorator/public.decorator";




@Injectable()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    async createOrder(): Promise<Order>{
        return this.orderService.createOrder()
    }
    
    @Post()
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