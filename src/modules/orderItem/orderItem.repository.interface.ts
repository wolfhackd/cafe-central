import type {
    AddOrderItemResult,
    DeleteOrderResult,
    RemoveOrderItemResult,
    UpdateOrderItemResult,
} from "./interfaces.js";

export interface OrderItemRepositoryInterface {
    addItemToOrder(
        orderId: string,
        productId: string,
        quantity: number,
    ): Promise<AddOrderItemResult>;
    updateOrderItem(
        orderId: string,
        itemId: string,
        quantity: number,
    ): Promise<UpdateOrderItemResult>;
    removeOrderItem(orderId: string, itemId: string): Promise<RemoveOrderItemResult>;
    deleteOrder(orderId: string): Promise<DeleteOrderResult>;
}
