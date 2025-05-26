import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
     @PrimaryGeneratedColumn('uuid')
     movieId: string;
     @Column()
     title: string;
     @Column()
     description: string;
     @Column()
     duration: number;
     @Column({nullable: true})
     imageUrl: string;
}
