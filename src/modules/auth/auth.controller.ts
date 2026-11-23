import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { AuthService } from "./auth.service.js";
import { LoginDto } from "./interface.js";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() login: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.login(login);

        response.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/',
        });

        return result;
    }
}