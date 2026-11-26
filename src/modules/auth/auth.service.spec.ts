import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { PASSWORD_HASHER } from "../../lib/PasswordHasher/bcrypt-password-hasher.module.js";
import { EmployeeRepository } from "../employee/employee.repository.js";
import type { Employee } from "../employee/interfaces.js";
import { Role } from "./enums/role.enum.js";
import { AuthService } from "./auth.service.js";

describe("AuthService", () => {
    it.each([
        { employeeRole: "ADMIN", authRole: Role.ADMIN },
        { employeeRole: "EMPLOYEE", authRole: Role.EMPLOYEE },
    ])("maps $employeeRole database role into the authorization role", async ({ employeeRole, authRole }) => {
        const employee: Employee = {
            id: "employee-id",
            name: "Test Employee",
            email: "employee@example.com",
            password: "hashed-password",
            role: employeeRole,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const signAsync = vi.fn().mockResolvedValue("signed-token");
        const findByEmail = vi.fn().mockResolvedValue(employee);
        const compare = vi.fn().mockResolvedValue(true);
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: JwtService, useValue: { signAsync } },
                { provide: EmployeeRepository, useValue: { findByEmail } },
                { provide: PASSWORD_HASHER, useValue: { compare } },
            ],
        }).compile();
        const authService = module.get(AuthService);

        await expect(
            authService.login({ email: employee.email, password: "password" }),
        ).resolves.toMatchObject({
            accessToken: "signed-token",
            employee: { role: authRole },
        });
        expect(signAsync).toHaveBeenCalledWith({
            sub: employee.id,
            email: employee.email,
            role: authRole,
        });

        await module.close();
    });
});
