import { Injectable } from "@nestjs/common";
import type { OrderItemRepositoryInterface } from "./ordermItem.repository.interface.js";
import { PrismaService } from "../../prisma/prisma.service.js";
import type {
    AddOrderItemResult,
    DeleteOrderResult,
    OrderItem,
    RemoveOrderItemResult,
    UpdateOrderItemResult,
} from "./interfaces.js";

@Injectable()
export class OrderItemRepository implements OrderItemRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}

    async addItemToOrder(
        orderId: string,
        productId: string,
        quantity: number,
    ): Promise<AddOrderItemResult> {
        return this.prisma.db.transaction(async (tx) => {
            const order = await tx.orm.public.Order.where({ id: orderId }).forNoKeyUpdate().first();
            if (!order) {
                return { status: "order-not-found" };
            }
            if (order.status !== "WAITING") {
                return { status: "order-not-editable" };
            }

            const product = await tx.orm.public.Product.where({ id: productId }).first();
            if (!product) {
                return { status: "product-not-found" };
            }

            const subtotal = multiplyDecimal(product.price, quantity);
            const updatedTotal = addDecimals(order.totalAmount, subtotal);
            const item = await tx.orm.public.OrderItem.create({
                orderId,
                productId,
                quantity,
                unitPrice: product.price,
                subtotal,
            });

            const updatedOrder = await tx.orm.public.Order.where({ id: orderId }).update({
                totalAmount: updatedTotal,
            });
            if (!updatedOrder) {
                throw new Error("Order disappeared while its row was locked");
            }

            const result: OrderItem = {
                id: item.id,
                orderId: item.orderId,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal,
            };
            return { status: "added", item: result };
        });
    }

    async updateOrderItem(
        orderId: string,
        itemId: string,
        quantity: number,
    ): Promise<UpdateOrderItemResult> {
        return this.prisma.db.transaction(async (tx) => {
            const order = await tx.orm.public.Order.where({ id: orderId }).forNoKeyUpdate().first();
            if (!order) {
                return { status: "order-not-found" };
            }
            if (order.status !== "WAITING") {
                return { status: "order-not-editable" };
            }

            const existingItem = await tx.orm.public.OrderItem.where({
                id: itemId,
                orderId,
            }).first();
            if (!existingItem) {
                return { status: "item-not-found" };
            }

            const subtotal = multiplyDecimal(existingItem.unitPrice, quantity);
            const totalAmount = addDecimals(
                order.totalAmount,
                subtractDecimals(subtotal, existingItem.subtotal),
            );
            const item = await tx.orm.public.OrderItem.where({
                id: itemId,
                orderId,
            }).update({ quantity, subtotal });
            if (!item) {
                return { status: "item-not-found" };
            }

            const updatedOrder = await tx.orm.public.Order.where({ id: orderId }).update({
                totalAmount,
            });
            if (!updatedOrder) {
                throw new Error("Order disappeared while its row was locked");
            }

            return {
                status: "updated",
                item: {
                    id: item.id,
                    orderId: item.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    subtotal: item.subtotal,
                },
            };
        });
    }

    async removeOrderItem(orderId: string, itemId: string): Promise<RemoveOrderItemResult> {
        return this.prisma.db.transaction(async (tx) => {
            const order = await tx.orm.public.Order.where({ id: orderId }).forNoKeyUpdate().first();
            if (!order) {
                return { status: "order-not-found" };
            }
            if (order.status !== "WAITING") {
                return { status: "order-not-editable" };
            }

            const existingItem = await tx.orm.public.OrderItem.where({
                id: itemId,
                orderId,
            }).first();
            if (!existingItem) {
                return { status: "item-not-found" };
            }

            const item = await tx.orm.public.OrderItem.where({
                id: itemId,
                orderId,
            }).delete();
            if (!item) {
                return { status: "item-not-found" };
            }

            const updatedOrder = await tx.orm.public.Order.where({ id: orderId }).update({
                totalAmount: subtractDecimals(order.totalAmount, existingItem.subtotal),
            });
            if (!updatedOrder) {
                throw new Error("Order disappeared while its row was locked");
            }

            return { status: "removed" };
        });
    }

    async deleteOrder(orderId: string): Promise<DeleteOrderResult> {
        return this.prisma.db.transaction(async (tx) => {
            const order = await tx.orm.public.Order.where({ id: orderId }).forUpdate().first();
            if (!order) {
                return { status: "order-not-found" };
            }
            if (order.status !== "WAITING") {
                return { status: "order-not-editable" };
            }

            const payment = await tx.orm.public.Payment.where({ paymentId: orderId }).first();
            if (payment) {
                return { status: "payment-exists" };
            }

            await tx.orm.public.OrderItem.where({ orderId }).deleteAll();
            const deletedOrder = await tx.orm.public.Order.where({ id: orderId }).delete();
            if (!deletedOrder) {
                throw new Error("Order disappeared while its row was locked");
            }

            return { status: "deleted" };
        });
    }
}

function multiplyDecimal(value: string, multiplier: number): string {
    const { coefficient, scale } = parseDecimal(value);
    return formatDecimal(coefficient * BigInt(multiplier), scale);
}

function addDecimals(left: string, right: string): string {
    const leftValue = parseDecimal(left);
    const rightValue = parseDecimal(right);
    const scale = Math.max(leftValue.scale, rightValue.scale);
    const leftCoefficient = leftValue.coefficient * 10n ** BigInt(scale - leftValue.scale);
    const rightCoefficient = rightValue.coefficient * 10n ** BigInt(scale - rightValue.scale);
    return formatDecimal(leftCoefficient + rightCoefficient, scale);
}

function subtractDecimals(left: string, right: string): string {
    const rightValue = parseDecimal(right);
    return addDecimals(left, formatDecimal(-rightValue.coefficient, rightValue.scale));
}

function parseDecimal(value: string): { coefficient: bigint; scale: number } {
    const match = /^(-?)(\d+)(?:\.(\d+))?$/.exec(value);
    if (!match) {
        throw new Error(`Invalid decimal value from database: ${value}`);
    }

    const fraction = match[3] ?? "";
    const coefficient = BigInt(`${match[1]}${match[2]}${fraction}`);
    return { coefficient, scale: fraction.length };
}

function formatDecimal(coefficient: bigint, scale: number): string {
    const negative = coefficient < 0n;
    const digits = (negative ? -coefficient : coefficient).toString().padStart(scale + 1, "0");
    const whole = scale === 0 ? digits : digits.slice(0, -scale);
    const fraction = scale === 0 ? "" : `.${digits.slice(-scale)}`;
    return `${negative ? "-" : ""}${whole}${fraction}`;
}
