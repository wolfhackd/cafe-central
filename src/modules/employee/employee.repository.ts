import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { CreateEmployeeDto, Employee } from "./interfaces.js";
import { EmployeeRepositoryInterface } from "./employee.repository.interface.js";


@Injectable()
export class EmployeeRepository implements EmployeeRepositoryInterface {
    constructor(private readonly prisma: PrismaService){}

    async createEmployee(createEmployeeDto:CreateEmployeeDto): Promise<Employee>{
        const res = await this.prisma.db.orm.public.Employee.create({
            name:createEmployeeDto.name,
            email:createEmployeeDto.email,
            role:createEmployeeDto.role,
            password:createEmployeeDto.password,
        })

        return res
    }

    async findByEmail(email:string): Promise<Employee | null> {
        return await this.prisma.db.orm.public.Employee.where({email}).first();
    }
}