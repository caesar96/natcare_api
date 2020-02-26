import { AbstractRepository, EntityRepository, FindConditions, getConnection, Repository } from 'typeorm';
import {  Cliente } from '../entities/Cliente.entity';

@EntityRepository(Cliente)
export class ClienteRepository extends AbstractRepository<Cliente> {

	public find(conditions?: FindConditions<Cliente>): Promise<Cliente[]> {
		return this.repository.find({
			relations: ['nextProgrammedDates', 'recommendedMeds', 'boughtMeds'],
			where: conditions
		});
	}

	public findById(_id_: number): Promise<Cliente> {
		return this.repository.findOne({
			relations: ['nextProgrammedDates', 'recommendedMeds', 'boughtMeds'],
			where: {id: _id_}
		});
	}	

}
//