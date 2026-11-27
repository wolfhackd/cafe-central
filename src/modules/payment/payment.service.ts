import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository.js";
import { OrderService } from "../order/order.service.js";



@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderService: OrderService,
    ){}

    async createPayment(orderId: string){
        //Verificar se order id existe
        const order = await this.orderService.findOrderById(orderId);
        if(!order){
            return null;
        }
        //Verificar se existe pagamento associado, se existir e caso esteja em pendente eu posso criar outro para substitui-lo
        const existingPayment = await this.paymentRepository.findPaymentByOrderId(orderId);
        
        if(!existingPayment){
            return this.paymentRepository.createPayment({
                orderId: order.id,
                totalAmount: order.totalAmount,
            });
        }

        if(existingPayment.status === 'PENDING'){
            return existingPayment;
        }

        return null;
    }
    
}

