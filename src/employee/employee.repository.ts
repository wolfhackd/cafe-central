import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateEmployeeDto, Employee } from "./interfaces.js";


@Injectable()
export class EmployeeRepository {
    constructor(private readonly prisma: PrismaService){}

    async createEmployee(createEmployeeDto:CreateEmployeeDto): Promise<Employee>{
        const res = await this.prisma.db.orm.public.Employee.create({
            name:createEmployeeDto.name,
            email:createEmployeeDto.email,
            role:createEmployeeDto.role,
            password:createEmployeeDto.password,
        })

        return {
            name:res.name,
            email:res.email,
            role:res.role,
            id:res.id,
            createdAt:res.createdAt,
            updatedAt:res.updatedAt,
        }
    }
}