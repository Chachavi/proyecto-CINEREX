import { IsEmail, IsString, MinLength } from "class-validator";

export class loginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    userPass: string;
    
}