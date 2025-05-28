import { IsEmail, IsIn, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    userPass: string;
    @IsString()
    @IsIn(['admin', 'user'])
    role: string;
}
