import { IsInt, IsUUID, Max, Min } from "class-validator";

export class AddOrderItemDto {
    @IsUUID()
    productId: string;

    @IsInt()
    @Min(1)
    @Max(2147483647)
    quantity: number;
}

export class UpdateOrderItemDto {
    @IsInt()
    @Min(1)
    @Max(2147483647)
    quantity: number;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    subtotal: string;
}

export type AddOrderItemResult =
    | { status: "order-not-found" }
    | { status: "order-not-editable" }
    | { status: "product-not-found" }
    | { status: "added"; item: OrderItem };

export type UpdateOrderItemResult =
    | { status: "order-not-found" }
    | { status: "order-not-editable" }
    | { status: "item-not-found" }
    | { status: "updated"; item: OrderItem };

export type RemoveOrderItemResult =
    | { status: "order-not-found" }
    | { status: "order-not-editable" }
    | { status: "item-not-found" }
    | { status: "removed" };

export type DeleteOrderResult =
    | { status: "order-not-found" }
    | { status: "order-not-editable" }
    | { status: "payment-exists" }
    | { status: "deleted" };
