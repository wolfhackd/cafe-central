import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployeeInput, Employee } from "./interfaces.js";
import { EmployeeService } from "./employee.service.js";



@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post('create')
    async createEmployee(@Body() body:CreateEmployeeInput): Promise<Employee>  {
        return this.employeeService.createEmployee(body)
    }

    @Post('login')
    login(){
        return 'Logado com sucesso'
    }

}