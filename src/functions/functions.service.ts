import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FunctionEntity } from './entities/function.entity';
import { Not, Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { Movie } from 'src/movies/entities/movie.entity';
import { Room } from 'src/room/entities/room.entity';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { IsBtcAddress } from 'class-validator';

@Injectable()
export class FunctionsService {
  constructor(
    @InjectRepository(FunctionEntity)
    private functionRepository: Repository<FunctionEntity>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
  ){}

  async create(createFunctionDto: CreateFunctionDto){
    // verificar que la pelicula existe
    const movie = await this.movieRepository.findOne({
    where: { movieId: createFunctionDto.movieId } });
      if (!movie) throw new NotFoundException('Movie not found');
    // Verificar que la sala existe
    const room = await this.roomRepository.findOne({
    where: { roomId: createFunctionDto.roomId } });
      if (!room) throw new NotFoundException('Room not found');
    // Validar que startTime sea en el futuro
    if (new Date(createFunctionDto.startTime) <= new Date()){
      throw new BadRequestException('Function cannot be in the past');
    }
    // Verificar conflictos de horario en la sala 
    const funcInRoom = await this.functionRepository.find({
      where: { room: { roomId: createFunctionDto.roomId } }, });
    
    const newHour = new Date(createFunctionDto.startTime);
    const newHourEnd = new Date(newHour.getTime() + movie.duration * 60000);

    for (const f of funcInRoom) {
      const fStart = new Date(f.startTime);
      const fEnd = new Date(fStart.getTime() + f.movie.duration * 60000);

      const overlap = newHour < fEnd && fStart < newHourEnd;

      if (overlap) {
        throw new BadRequestException('There is overlap with another function in this room');
      }
    }

    // Crear y guardar
    const func = this.functionRepository.create({
      startTime: createFunctionDto.startTime,
      movie,
      room,
    });

    return this.functionRepository.save(func)
  }

  findAll(){
    return this.functionRepository.find()
  }

  findOne(id: string){
    const func = this.functionRepository.findOneBy({
      functionId: id
    })
    if (!func) throw new NotFoundException()
      return func;
  }

  async update(id: string, updateFunctionDto: UpdateFunctionDto){
  const funcToUpdate = await this.functionRepository.preload({
    functionId: id,
    ...updateFunctionDto
  });
  if (!funcToUpdate) throw new NotFoundException(`Function ${id} does not exist`)
    return this.functionRepository.save(funcToUpdate)
  }

  remove(id: string) {
    const func= this.functionRepository.delete({
      functionId: id
    })
    if(!func) throw new NotFoundException(`Function with id ${id} not found`)
      return `Function with id ${id} successfully deleted`
  }
}
