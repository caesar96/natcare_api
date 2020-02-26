import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import {Cliente} from './Cliente.entity';
import {Promotor} from './Promotor.entity';

@Entity({name: 'socios'})
export class Socio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    firstName: string;

    @Column({type: 'varchar', nullable: false})
    lastName: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', nullable: false})
    dim: string;

    @Column({type: 'date', nullable: false})
    birthDate: Date;

    @Column({type: 'timestamp', nullable: false})
    registeredDate: Date;

    @Index()
    @Column({type:'varchar', nullable: false})
    phone: string;

    @ManyToMany(type => Cliente, cliente => cliente.socios)
    @JoinTable()
    clientes: Cliente[];

    @OneToMany(type => Promotor, promotor => promotor.socio)
    @JoinTable()
    promotores: Promotor[];
}