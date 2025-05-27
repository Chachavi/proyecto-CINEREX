import { FunctionEntity } from "src/functions/entities/function.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    ticketId: string

    @ManyToOne(()=> FunctionEntity, (func) => func.tickets, {eager: true})
    @JoinColumn({
        name: 'functionId'
    })
    function: FunctionEntity;

    @Column()
    seat: string;

    @Column({ default: 'reserved' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
    
}
