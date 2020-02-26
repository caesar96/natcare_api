import { getConnection } from 'typeorm'
import { ClienteRepository } from '../repository/Cliente.repository';

export class ClienteController {

	private static clientes: ClienteRepository;
	private static isRepositorySet:boolean = false;

	private static setRepository() {
		if (!this.isRepositorySet) {
			const conn = getConnection();
			this.clientes = conn.getCustomRepository(ClienteRepository);
			this.isRepositorySet = true;
		}
	}

	public static getClientes () {
		this.setRepository();
		//
		return this.clientes.find();
	}

	public static getCliente (id: number) {
		this.setRepository();
		//
		return this.clientes.findById(id);
	}
}