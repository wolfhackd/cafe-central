import { Injectable } from "@nestjs/common";
import { OrderItemRepositoryInterface } from "./ordermItem.repository.interface";
import { PrismaService } from "../prisma/prisma.service";



@Injectable()
export class OrderItemRepository implements OrderItemRepositoryInterface {
    
    constructor(private readonly prisma: PrismaService){}

    // async createOrderItem(id: string, quantity: number) {
    //     return await this.prisma.db.orm.public.OrderItem.create()
    // }

}