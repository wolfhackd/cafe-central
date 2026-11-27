import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller.js";
import { PrismaModule } from "../../prisma/prisma.module.js";
import { PaymentService } from "./payment.service.js";
import { PaymentRepository } from "./payment.repository.js";
import { OrderModule } from "../order/order.module.js";

@Module({
    controllers: [PaymentController],
    imports: [PrismaModule, OrderModule],
    providers: [PaymentService, PaymentRepository],
    exports: [PaymentService],
})
export class PaymentModule {}