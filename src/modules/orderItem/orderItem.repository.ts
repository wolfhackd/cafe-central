import { Injectable } from "@nestjs/common";
import type { OrderItemRepositoryInterface } from "./ordermItem.repository.interface.js";
import { PrismaService } from "../../prisma/prisma.service.js";



@Injectable()
export class OrderItemRepository implements OrderItemRepositoryInterface {
    
    constructor(private readonly prisma: PrismaService){}

    // async createOrderItem(id: string, quantity: number) {
    //     return await this.prisma.db.orm.public.OrderItem.create()
    // }

}