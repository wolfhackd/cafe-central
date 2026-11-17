import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export type EmployeeRole = "ADMIN" | "EMPLOYEE";


export interface CreateEmployeeDto {
    name:string,
    email:string,
    password: string,
    role:EmployeeRole,
}

export class CreateEmployeeInput {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    role:EmployeeRole
}

export interface Employee{
    name: string;
    email: string;
    role: EmployeeRole;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}