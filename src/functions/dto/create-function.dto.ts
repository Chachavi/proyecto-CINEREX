import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateFunctionDto {
  @IsUUID()
  @IsNotEmpty({ message: 'movieId es obligatorio' })
  movieId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'roomId es obligatorio' })
  roomId: string;

  @IsDateString()
  @IsNotEmpty({ message: 'startTime es obligatorio' })
  startTime: Date;
}
