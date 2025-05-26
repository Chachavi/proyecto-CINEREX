import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { FunctionsController } from './functions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from './entities/function.entity';
import { Room } from 'src/room/entities/room.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionEntity, Room, Movie]), 
  MoviesModule,
  RoomModule,
],
  controllers: [FunctionsController],
  providers: [FunctionsService],
})
export class FunctionsModule {}
