import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PasswordHasherModule } from "../../lib/PasswordHasher/bcrypt-password-hasher.module.js";
import { EmployeeModule } from "../employee/employee.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthGuard } from "./guards/jwt-auth.guard.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";

@Module({
    imports: [
        EmployeeModule,
        PasswordHasherModule,
        PassportModule.register({
            defaultStrategy: "jwt",
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard
    ],
    controllers: [AuthController]
})
export class AuthModule {}