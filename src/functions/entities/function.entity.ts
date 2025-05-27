import { Movie } from "src/movies/entities/movie.entity";
import { Room } from "src/room/entities/room.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FunctionEntity {
    @PrimaryGeneratedColumn('uuid')
    functionId: string;

    @ManyToOne(()=> Movie, (movie)=> movie.functions, {eager: true})
    @JoinColumn({
        name: 'movieId'
    })
    movie: Movie;

    @ManyToOne(()=> Room, (room)=> room.functions, {eager: true})
    @JoinColumn({
        name: 'roomId'
    })
    room: Room

    @Column()
    startTime: Date;

    @OneToMany(()=> Ticket, (ticket)=> ticket.function)
    tickets: Ticket[];
}
