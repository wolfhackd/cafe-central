import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service.js";



@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @Post('create')
    async createPayment(@Body('orderId') orderId: string){
        return this.paymentService.createPayment(orderId);
    }
}