
import type { Order } from "./interfaces.ts";


export interface OrderRepositoryInterface {
    createOrder(order: Order): Promise<Order>;
    findOpenOrders(): Promise<Order[]>;
    findOrderById(orderId: string): Promise<Order | null>;
}