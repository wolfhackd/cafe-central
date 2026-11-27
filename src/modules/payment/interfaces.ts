import { IsString, IsUUID, Matches } from "class-validator";

export type PaymentStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'CASH';

export class CreatePaymentDto {
    @IsString()
    @Matches(/^(?=.*[1-9])(?:0|[1-9]\d*)(?:\.\d{1,2})?$/, {
    message: 'totalAmount deve ser um valor positivo com até 2 casas decimais',
    })
    totalAmount: string;

    @IsString()
    @IsUUID()
    orderId: string;
}

export interface Payment {
    paymentId: string;
    paymentMethod: string;
    amount: string;
    status: string;
    createdAt: Date;
    paidAt: Date | null;

}