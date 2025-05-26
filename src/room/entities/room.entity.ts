import { IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    roomId: string;
    @Column()
    name: string;
    @Column()
    @IsInt()
    capacity: number;
}
