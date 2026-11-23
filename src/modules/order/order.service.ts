import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { Order } from "./interfaces";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository){}

    async createOrder(): Promise<Order>{
        return this.orderRepository.createOrder()
    }

    async findOpenOrders(): Promise<Order[]> {
        return this.orderRepository.findOpenOrders();
    }

    async findOrderById(id:string): Promise<Order| null>{
        return this.orderRepository.findOrderById(id);
    }
}