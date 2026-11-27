import { PrismaService } from "../../prisma/prisma.service.js";
import { PaymentRepositoryInterface } from "./payment.repository.interface.js";
import type { CreatePaymentDto, Payment } from "./interfaces.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentRepository implements PaymentRepositoryInterface {
    constructor(private readonly prisma: PrismaService){}

    async findPaymentByOrderId(orderId: string): Promise<Payment | null> {
        const payment = await this.prisma.db.orm.public.Payment.whereUnique({paymentId: orderId}).first();
        if(!payment){
            return null;
        }
        return payment;
    }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment | null> {
        
        const payment = await this.prisma.db.orm.public.Payment.create({
            paymentId: createPaymentDto.orderId,
            paymentMethod: 'PIX',
            amount: createPaymentDto.totalAmount,
            status: 'PENDING',
        })

        return payment;
    }

    async confirmPayment(orderId: string): Promise<Payment | null> {
        const order = await this.prisma.db.orm.public.Order.whereUnique({id: orderId}).include('payment').first();
        if(!order){
            return null;
        }
        if(order.payment?.status !== 'PENDING'){
            return null;
        }
        const payment = await this.prisma.db.orm.public.Payment.whereUnique({paymentId: order.id}).update({
            status: 'PAID',
            paidAt: new Date(),
        })
        return payment;
    }

    async cancelPayment(orderId: string): Promise<Payment | null> {
        const payment = await this.prisma.db.orm.public.Payment.whereUnique({paymentId: orderId}).update({
            status: 'CANCELLED',
        })
        return payment;
    }

    async failPayment(orderId: string): Promise<Payment | null> {
       
        const payment = await this.prisma.db.orm.public.Payment.whereUnique({paymentId: orderId}).update({
            status: 'FAILED',
        })
        return payment;
    }
}