import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "./employee.repository.js";
import type { PasswordHasher } from "../../lib/PasswordHasher/interface.js";
import { PASSWORD_HASHER } from "../../lib/PasswordHasher/bcrypt-password-hasher.module.js";
import { CreateEmployeeInput, Employee } from "./interfaces.js";

@Injectable()
export class EmployeeService {
    constructor(
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher,
        private readonly employeeRepository: EmployeeRepository
    ){
       
    }

    async createEmployee(createEmployeeDto: CreateEmployeeInput): Promise<Employee>{
        const hashedPassword = await this.passwordHasher.hash(createEmployeeDto.password);
        const employee = {
            name:createEmployeeDto.name,
            email:createEmployeeDto.email,
            role:createEmployeeDto.role,
            password:hashedPassword,
        }

        const res = await this.employeeRepository.createEmployee(employee);

        if(res){
            
            return res
        }
        throw new BadRequestException('Failed to create employee');
    }
}