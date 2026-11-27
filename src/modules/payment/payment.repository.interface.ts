import type { CreatePaymentDto, Payment } from "./interfaces.js";


export interface PaymentRepositoryInterface {
    //Atualiza a ordem de pagamento para pagando e escolhe a forma de pagamento fictício (PENDING)
    createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment | null>;
    //Preciso que retorne a ordem pra atualizar a confirmação de pagamento e atualiza para pago (PAID)
    confirmPayment(orderId: string): Promise<Payment | null>;
    //Preciso de uma rota que cancele o pagamento (CANCELLED)
    cancelPayment(orderId: string): Promise<Payment | null>;
    //Preciso de uma rota que diga que falhou por algum motivo, seja por tempo ou cancelamento do banco(FAILED)
    failPayment(orderId: string): Promise<Payment | null>;
    //Preciso de uma rota para procurar um pagamento por orderId
    findPaymentByOrderId(orderId: string): Promise<Payment | null>;

}