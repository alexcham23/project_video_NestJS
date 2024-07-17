import { IsEmail, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {

    @MinLength(3)
    @MaxLength(20)
    name: string;
    

    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(20)
    password: string;
}