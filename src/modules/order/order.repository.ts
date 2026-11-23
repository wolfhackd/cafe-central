import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Order } from "./interfaces";
import { OrderRepositoryInterface } from "./order.repository.interface";


@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
    constructor(private readonly prisma : PrismaService){}

    async createOrder(): Promise<Order> {
        return this.prisma.db.orm.public.Order.create({
            totalAmount: "0.00"
        });
    }

    async findOpenOrders(): Promise<Order[]> {
        return await this.prisma.db.orm.public.Order.where({ status: "WAITING" }).all();
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        return await this.prisma.db.orm.public.Order.where({ id: orderId }).first();
    }

    
}