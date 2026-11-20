import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "./enums/role.enum";

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
        role: Role;
    };
}

export interface AuthInterface {
    login(login: Login): Promise<LoginResponse>
}