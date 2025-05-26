import { FunctionEntity} from "src/functions/entities/function.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

     @OneToMany(()=> FunctionEntity, (functions)=> functions.movie)
     functions: FunctionEntity[];
}
