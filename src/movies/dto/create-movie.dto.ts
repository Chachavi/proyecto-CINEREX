import { IsNotEmpty, IsString, IsInt, MaxLength, IsOptional, IsUrl } from "class-validator";
import { Movie } from "../entities/movie.entity";

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
    @IsUrl()
    imageUrl: string;
}
