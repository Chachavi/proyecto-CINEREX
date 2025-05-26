import { IsNotEmpty, IsInt, Min} from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    capacity: number;
}
