import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany, JoinTable, Index }  from 'typeorm';

import {Cliente} from './Cliente.entity';
import { Medicamento } from './Medicamento.entity';

@Entity({name:'ventas'})
export class Venta {
	@PrimaryGeneratedColumn()
	id: number;

    @ManyToMany(type => Medicamento, medicamento => medicamento.solds)
    @JoinTable()
    soldMeds: Medicamento[];

	@ManyToOne(type => Cliente, cliente => cliente.boughtMeds)
    cliente!: Cliente;

    @Index()
   	@Column({type: 'boolean', nullable: true})
    isSold: boolean = true;

    @Column( {type: 'double precision', nullable: true} )
    total: number;

    @Column({type: 'date', nullable: true})
	deliveredDate: Date;

    @Column({type: 'timestamp', nullable: true})
    sellDate: Date;
}