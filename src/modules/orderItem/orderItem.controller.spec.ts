import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { OrderItemController } from "./orderItem.controller.js";
import { OrderItemService } from "./orderItem.service.js";

describe("OrderItemController", () => {
    let app: INestApplication;
    const addItemToOrder = vi.fn();
    const updateOrderItem = vi.fn();
    const removeOrderItem = vi.fn();
    const deleteOrder = vi.fn();

    beforeEach(async () => {
        addItemToOrder.mockReset();
        updateOrderItem.mockReset();
        removeOrderItem.mockReset();
        deleteOrder.mockReset();
        vi.spyOn(JwtAuthGuard.prototype, "canActivate").mockReturnValue(true);
        vi.spyOn(RolesGuard.prototype, "canActivate").mockReturnValue(true);
        const module = await Test.createTestingModule({
            controllers: [OrderItemController],
            providers: [
                {
                    provide: OrderItemService,
                    useValue: {
                        addItemToOrder,
                        updateOrderItem,
                        removeOrderItem,
                        deleteOrder,
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
        vi.restoreAllMocks();
    });

    it("adds a product to an order", async () => {
        const item = {
            id: "550e8400-e29b-41d4-a716-446655440002",
            orderId: "550e8400-e29b-41d4-a716-446655440000",
            productId: "550e8400-e29b-41d4-a716-446655440001",
            quantity: 2,
            unitPrice: "3.50",
            subtotal: "7.00",
        };
        addItemToOrder.mockResolvedValue(item);

        await request(app.getHttpServer())
            .post("/order/550e8400-e29b-41d4-a716-446655440000/items")
            .send({ productId: item.productId, quantity: 2 })
            .expect(201, item);

        expect(addItemToOrder).toHaveBeenCalledWith(item.orderId, {
            productId: item.productId,
            quantity: 2,
        });
    });

    it("rejects invalid quantities before calling the service", async () => {
        await request(app.getHttpServer())
            .post("/order/550e8400-e29b-41d4-a716-446655440000/items")
            .send({
                productId: "550e8400-e29b-41d4-a716-446655440001",
                quantity: 0,
            })
            .expect(400);

        expect(addItemToOrder).not.toHaveBeenCalled();
    });

    it("updates an item's quantity", async () => {
        const item = {
            id: "550e8400-e29b-41d4-a716-446655440002",
            orderId: "550e8400-e29b-41d4-a716-446655440000",
            productId: "550e8400-e29b-41d4-a716-446655440001",
            quantity: 3,
            unitPrice: "3.50",
            subtotal: "10.50",
        };
        updateOrderItem.mockResolvedValue(item);

        await request(app.getHttpServer())
            .patch(`/order/${item.orderId}/items/${item.id}`)
            .send({ quantity: 3 })
            .expect(200, item);

        expect(updateOrderItem).toHaveBeenCalledWith(item.orderId, item.id, {
            quantity: 3,
        });
    });

    it("removes an item from an order", async () => {
        const orderId = "550e8400-e29b-41d4-a716-446655440000";
        const itemId = "550e8400-e29b-41d4-a716-446655440002";

        await request(app.getHttpServer()).delete(`/order/${orderId}/items/${itemId}`).expect(200);

        expect(removeOrderItem).toHaveBeenCalledWith(orderId, itemId);
    });

    it("deletes an order", async () => {
        const orderId = "550e8400-e29b-41d4-a716-446655440000";

        await request(app.getHttpServer()).delete(`/order/${orderId}`).expect(200);

        expect(deleteOrder).toHaveBeenCalledWith(orderId);
    });
});
