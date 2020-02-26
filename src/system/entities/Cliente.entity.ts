import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, JoinTable }  from 'typeorm';
import { Medicamento } from './Medicamento.entity';
import {  Cita } from './Cita.entity';
import { Venta } from  './Venta.entity'; 
import { Socio } from  './Socio.entity'; 

@Entity({name:'clientes'})
export class Cliente {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'varchar', nullable: false})
    firstName: string;

   	@Column({type: 'varchar', nullable: false})
    lastName: string;

    @Column({type:'varchar', nullable: false})
    phone1: string;

    @Column({type:'varchar', nullable: true})
    referencePhone?: string;

    @Column({type: 'varchar', nullable: false})
    address: string;

    @Column({type: 'varchar', nullable: true})
    referenceAddress?: string;

    @Column({type: 'timestamp', nullable: false})
    registeredDate: Date;

	@OneToMany(type => Cita, cita => cita.cliente)
    nextProgrammedDates: Cita[];

    @Column({type: 'date', nullable: true})
    birthDay: Date;

    @ManyToMany(type => Medicamento, medicamento => medicamento.clientes)
    @JoinTable()
    recommendedMeds: Medicamento[];

    @ManyToMany(type => Socio, socio => socio.clientes)
    socios: Socio[];

	@OneToMany(type => Venta, venta => venta.cliente)
	@JoinTable()
    boughtMeds: Venta[];

}