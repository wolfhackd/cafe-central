import { Module } from "@nestjs/common";
import { BcryptPasswordHasher } from "./bcrypt-password-hasher.js";


export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

@Module({
    providers: [
        {
            provide: PASSWORD_HASHER,
            useClass: BcryptPasswordHasher
        }
    ],
    exports: [PASSWORD_HASHER]
})

export class PasswordHasherModule {}