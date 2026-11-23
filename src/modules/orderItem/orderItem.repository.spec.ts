import { Test } from "@nestjs/testing";
import { PrismaService } from "../../prisma/prisma.service.js";
import { OrderItemRepository } from "./orderItem.repository.js";

describe("OrderItemRepository", () => {
    it("creates the item and updates the total without floating-point rounding", async () => {
        const order = { id: "order-id", status: "WAITING", totalAmount: "0.2" };
        const product = { id: "product-id", price: "0.1" };
        const item = {
            id: "item-id",
            orderId: order.id,
            productId: product.id,
            quantity: 3,
            unitPrice: product.price,
            subtotal: "0.3",
        };
        const updateOrder = vi.fn(async () => order);
        const createOrderItem = vi.fn(async () => item);
        const tx = {
            orm: {
                public: {
                    Order: {
                        where: () => ({
                            forNoKeyUpdate: () => ({
                                first: async () => order,
                            }),
                            update: updateOrder,
                        }),
                    },
                    Product: {
                        where: () => ({
                            first: async () => product,
                        }),
                    },
                    OrderItem: {
                        create: createOrderItem,
                    },
                },
            },
        };
        const transaction = vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) =>
            callback(tx),
        );
        const module = await Test.createTestingModule({
            providers: [
                OrderItemRepository,
                {
                    provide: PrismaService,
                    useValue: { db: { transaction } },
                },
            ],
        }).compile();
        const repository = module.get(OrderItemRepository);

        await expect(repository.addItemToOrder(order.id, product.id, 3)).resolves.toEqual({
            status: "added",
            item,
        });
        expect(createOrderItem).toHaveBeenCalledWith({
            orderId: order.id,
            productId: product.id,
            quantity: 3,
            unitPrice: "0.1",
            subtotal: "0.3",
        });
        expect(updateOrder).toHaveBeenCalledWith({ totalAmount: "0.5" });
        expect(transaction).toHaveBeenCalledOnce();
    });

    it("recalculates the item subtotal and order total when changing quantity", async () => {
        const order = { id: "order-id", status: "WAITING", totalAmount: "0.5" };
        const existingItem = {
            id: "item-id",
            orderId: order.id,
            productId: "product-id",
            quantity: 2,
            unitPrice: "0.1",
            subtotal: "0.2",
        };
        const updatedItem = { ...existingItem, quantity: 3, subtotal: "0.3" };
        const updateItem = vi.fn(async () => updatedItem);
        const updateOrder = vi.fn(async () => ({ ...order, totalAmount: "0.6" }));
        const tx = {
            orm: {
                public: {
                    Order: {
                        where: () => ({
                            forNoKeyUpdate: () => ({
                                first: async () => order,
                            }),
                            update: updateOrder,
                        }),
                    },
                    OrderItem: {
                        where: () => ({
                            first: async () => existingItem,
                            update: updateItem,
                        }),
                    },
                },
            },
        };
        const transaction = vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) =>
            callback(tx),
        );
        const module = await Test.createTestingModule({
            providers: [
                OrderItemRepository,
                {
                    provide: PrismaService,
                    useValue: { db: { transaction } },
                },
            ],
        }).compile();
        const repository = module.get(OrderItemRepository);

        await expect(repository.updateOrderItem(order.id, existingItem.id, 3)).resolves.toEqual({
            status: "updated",
            item: updatedItem,
        });
        expect(updateItem).toHaveBeenCalledWith({ quantity: 3, subtotal: "0.3" });
        expect(updateOrder).toHaveBeenCalledWith({ totalAmount: "0.6" });
    });

    it("does not delete an order that has an associated payment", async () => {
        const order = { id: "order-id", status: "WAITING", totalAmount: "10.00" };
        const deleteItems = vi.fn();
        const deleteOrder = vi.fn();
        const tx = {
            orm: {
                public: {
                    Order: {
                        where: () => ({
                            forUpdate: () => ({
                                first: async () => order,
                            }),
                            delete: deleteOrder,
                        }),
                    },
                    Payment: {
                        where: () => ({
                            first: async () => ({ paymentId: order.id }),
                        }),
                    },
                    OrderItem: {
                        where: () => ({ deleteAll: deleteItems }),
                    },
                },
            },
        };
        const transaction = vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) =>
            callback(tx),
        );
        const module = await Test.createTestingModule({
            providers: [
                OrderItemRepository,
                {
                    provide: PrismaService,
                    useValue: { db: { transaction } },
                },
            ],
        }).compile();
        const repository = module.get(OrderItemRepository);

        await expect(repository.deleteOrder(order.id)).resolves.toEqual({
            status: "payment-exists",
        });
        expect(deleteItems).not.toHaveBeenCalled();
        expect(deleteOrder).not.toHaveBeenCalled();
    });

    it("removes an item and subtracts its subtotal from the order total", async () => {
        const order = { id: "order-id", status: "WAITING", totalAmount: "10.50" };
        const item = {
            id: "item-id",
            orderId: order.id,
            productId: "product-id",
            quantity: 1,
            unitPrice: "3.50",
            subtotal: "3.50",
        };
        const deleteItem = vi.fn(async () => item);
        const updateOrder = vi.fn(async () => ({ ...order, totalAmount: "7.00" }));
        const tx = {
            orm: {
                public: {
                    Order: {
                        where: () => ({
                            forNoKeyUpdate: () => ({
                                first: async () => order,
                            }),
                            update: updateOrder,
                        }),
                    },
                    OrderItem: {
                        where: () => ({
                            first: async () => item,
                            delete: deleteItem,
                        }),
                    },
                },
            },
        };
        const transaction = vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) =>
            callback(tx),
        );
        const module = await Test.createTestingModule({
            providers: [
                OrderItemRepository,
                {
                    provide: PrismaService,
                    useValue: { db: { transaction } },
                },
            ],
        }).compile();
        const repository = module.get(OrderItemRepository);

        await expect(repository.removeOrderItem(order.id, item.id)).resolves.toEqual({
            status: "removed",
        });
        expect(deleteItem).toHaveBeenCalledOnce();
        expect(updateOrder).toHaveBeenCalledWith({ totalAmount: "7.00" });
    });

    it("deletes a waiting order without a payment and its items", async () => {
        const order = { id: "order-id", status: "WAITING", totalAmount: "0.00" };
        const deleteItems = vi.fn();
        const deleteOrder = vi.fn(async () => order);
        const tx = {
            orm: {
                public: {
                    Order: {
                        where: () => ({
                            forUpdate: () => ({
                                first: async () => order,
                            }),
                            delete: deleteOrder,
                        }),
                    },
                    Payment: {
                        where: () => ({
                            first: async () => null,
                        }),
                    },
                    OrderItem: {
                        where: () => ({ deleteAll: deleteItems }),
                    },
                },
            },
        };
        const transaction = vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) =>
            callback(tx),
        );
        const module = await Test.createTestingModule({
            providers: [
                OrderItemRepository,
                {
                    provide: PrismaService,
                    useValue: { db: { transaction } },
                },
            ],
        }).compile();
        const repository = module.get(OrderItemRepository);

        await expect(repository.deleteOrder(order.id)).resolves.toEqual({
            status: "deleted",
        });
        expect(deleteItems).toHaveBeenCalledOnce();
        expect(deleteOrder).toHaveBeenCalledOnce();
    });
});
