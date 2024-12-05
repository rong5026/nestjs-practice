import { Entity, OneToMany } from "typeorm";
import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type=>UserAuthority, UserAuthority=>UserAuthority.user, {eager: true})
    authorities?: any[];
}