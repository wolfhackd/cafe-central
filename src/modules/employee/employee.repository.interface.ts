import { CreateEmployeeDto, Employee } from "./interfaces";



export interface EmployeeRepositoryInterface {

    createEmployee(createEmployeeDto:CreateEmployeeDto): Promise<Employee>;
    findByEmail(email: string): Promise<Employee | null>;
}