import { Column, PrimaryGeneratedColumn, Entity, ManyToMany }  from 'typeorm';

import {Cliente} from './Cliente.entity';
import { Venta } from  './Venta.entity'; 

@Entity({name:'medicamentos'})
export class Medicamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'double precision', nullable: false})
    price: number;

    @Column({type: 'varchar', nullable: false})
    description: string;

    @Column({type: 'date', nullable: false})
    expireDate: Date;

    @ManyToMany(type => Cliente, cliente => cliente.recommendedMeds)
    clientes: Cliente[];

    @ManyToMany(type => Venta, venta => venta.soldMeds)
    solds: Venta[];
}