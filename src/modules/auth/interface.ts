import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface Login{
    email: string;
    password: string;
}

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export interface LoginResponse{
    accessToken: string;
    employee: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export interface AuthInterface {
    login(login: Login): Promise<LoginResponse>
}