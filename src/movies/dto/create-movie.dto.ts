import { IsNotEmpty, IsString, IsInt, MaxLength, IsOptional } from "class-validator";

export class CreateMovieDto{
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsInt()
    @IsNotEmpty()
    duration: number;
    @IsOptional()
    @IsString()
    imageUrl: string;
}
