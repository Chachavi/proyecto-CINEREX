import { FunctionEntity } from "src/functions/entities/function.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    roomId: string;
    @Column()
    name: string;
    @Column()
    capacity: number;

    @OneToMany(()=> FunctionEntity, (func)=> func.room)
    functions: FunctionEntity[];
}
