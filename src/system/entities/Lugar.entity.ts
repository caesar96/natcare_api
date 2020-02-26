import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany, Index }  from 'typeorm';

import {Cliente} from './Cliente.entity';

@Entity({name:'lugares'})
export class Lugar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    agency: string;

    @Column({type: 'varchar', nullable: false})
    colony: string;

    @Column({type: 'varchar', nullable: false})
    district: string;

    @Column({type: 'varchar', nullable: false})
    president: string;

    @Column({type: 'int', nullable: false})
    phone: number;    

    @Column({type: 'varchar', nullable: false})
    secretary: string;

    @Index()
    @Column({type: 'boolean', nullable: false})
    isProfitable: boolean;

    @Column({type: 'date', nullable: false})
    birthDate: Date;

    @Index()
    @Column({type: 'boolean', nullable: false})
    isContactable: boolean;

    @Column({type: 'date', nullable: false})
    dealDate: Date;
}