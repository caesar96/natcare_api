import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, Index }  from 'typeorm';

import {Cliente} from './Cliente.entity';

@Entity({name:'citas'})
export class Cita {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: 'timestamp', nullable: false})	
	citaDate: Date;

	@Index()
	@Column({type: 'boolean', nullable: false})
	isPending: boolean = true;

	@ManyToOne(type => Cliente, cliente => cliente.nextProgrammedDates)
    cliente!: Cliente;
}