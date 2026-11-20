import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import type { LoginDto } from "./interface.js";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }
}