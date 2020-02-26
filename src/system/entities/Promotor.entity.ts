import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Socio } from  './Socio.entity'; 

@Entity({name: 'promotores'})
export class Promotor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    firstName: string;

    @Column({type: 'varchar', nullable: false})
    lastName: string;

    @Column({type: 'timestamp', nullable: false})
    registeredDate: Date;

    @Column({type: 'varchar', nullable: false})
    address: string;

    @Column({type: 'int', nullable: false})
    phone: number;  

    @Column({type: 'date', nullable: false})
    birthDate: Date;

    @ManyToOne(type => Socio, socio => socio.promotores)
    socio: Socio;    
}