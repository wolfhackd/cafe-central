import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthInterface, Login, LoginResponse } from "./interface.js";
import { JwtService } from '@nestjs/jwt'
import { EmployeeRepository } from "../employee/employee.repository.js";
import { PASSWORD_HASHER } from "../../lib/PasswordHasher/bcrypt-password-hasher.module.js";
import type { PasswordHasher } from "../../lib/PasswordHasher/interface.js";
import { Employee } from "../employee/interfaces.js";
import { Role } from "./enums/role.enum.js";



@Injectable()
export class AuthService implements AuthInterface {
    constructor(
        private readonly jwtService: JwtService,
        private readonly employeeRepository: EmployeeRepository,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher

    ){}

    async login(login: Login): Promise<LoginResponse> {
        const employee = await this.employeeRepository.findByEmail(login.email);

        if(!employee) {
            throw new UnauthorizedException('Invalid credentials or user not found');
        }

        const passwordMatches = await this.passwordHasher.compare(login.password, employee.password);

        if(!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials or user not found');
        }

        const payload = {
            sub: employee.id,
            email: employee.email,
            role: employee.role as Role
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return{
            accessToken,
            employee:{
                id: employee.id,
                name: employee.name,
                email: employee.email,
                role: employee.role as Role,
            }
        }



    }
}