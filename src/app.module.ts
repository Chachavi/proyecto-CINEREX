import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'hola',
    database: 'cinerex_db',
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), MoviesModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
