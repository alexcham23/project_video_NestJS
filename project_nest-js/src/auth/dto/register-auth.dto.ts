import { IsEmail, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterAuthDto {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(20)
    name: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}