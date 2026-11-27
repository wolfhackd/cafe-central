import { Test } from "@nestjs/testing";
import { OrderService } from "../order/order.service.js";
import { PaymentRepository } from "./payment.repository.js";
import { PaymentService } from "./payment.service.js";

describe("PaymentService", () => {
    it("creates a payment using the order id as its foreign key", async () => {
        const order = {
            id: "550e8400-e29b-41d4-a716-446655440000",
            totalAmount: "12.50",
        };
        const paymentRepository = {
            findPaymentByOrderId: vi.fn().mockResolvedValue(null),
            createPayment: vi.fn().mockResolvedValue({
                paymentId: order.id,
                amount: order.totalAmount,
                status: "PENDING",
            }),
        };
        const orderService = {
            findOrderById: vi.fn().mockResolvedValue(order),
        };
        const module = await Test.createTestingModule({
            providers: [
                PaymentService,
                { provide: PaymentRepository, useValue: paymentRepository },
                { provide: OrderService, useValue: orderService },
            ],
        }).compile();
        const service = module.get(PaymentService);

        await service.createPayment(order.id);

        expect(paymentRepository.createPayment).toHaveBeenCalledWith({
            orderId: order.id,
            totalAmount: order.totalAmount,
        });

        await module.close();
    });
});
