import { IsNotEmpty, IsOptional, IsString, IsUUID, IsIn } from "class-validator";

export class CreateTicketDto {
    @IsUUID()
    @IsNotEmpty()
    functionId: string;

    @IsString()
    @IsNotEmpty()
    seat: string;

    @IsOptional()
    @IsIn(['confirmed', 'reserved'])
    status: string;
}
