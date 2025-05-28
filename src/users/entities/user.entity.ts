import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}
