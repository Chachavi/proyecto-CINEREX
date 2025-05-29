import { Ticket } from "src/tickets/entities/ticket.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column()
    email: string;
    @Column()
    userPass: string;
    @Column({default: 'admin'})
    role: string;

    @OneToMany(()=> Ticket, (ticket)=> ticket.user)
    tickets: Ticket[];

}
