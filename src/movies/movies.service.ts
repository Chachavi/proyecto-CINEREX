import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ){}

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save(createMovieDto)
  }

  findAll() {
    return this.movieRepository.find()
  }

  findOne(id: string) {
    const movie = this.movieRepository.findOneBy({
      movieId: id,
    });
    if (!movie) throw new NotFoundException()
      return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movieToUpdate = await this.movieRepository.preload({
      movieId: id,
      ...updateMovieDto
    });
    if (!movieToUpdate) throw new NotFoundException()
      return this.movieRepository.save(movieToUpdate)
  }

  remove(id: string) {
    const movie = this.movieRepository.delete({
      movieId: id
    });
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`)
      return movie;
  }

}
