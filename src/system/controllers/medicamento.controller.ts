import { getConnection, Repository } from 'typeorm'
import { Medicamento } from '../entities/Medicamento.entity';

export class MedicamentosController {

	private static medicamentos: Repository<Medicamento>;
	private static isRepositorySet:boolean = false;

	private static setRepository() {
		if (!this.isRepositorySet) {
			const conn = getConnection();
			this.medicamentos = conn.getRepository(Medicamento);
			this.isRepositorySet = true;
		}
	}

	public static getMedicamentos () {
		this.setRepository();
		//
		return this.medicamentos.find();
	}

	public static getMedicamento (id: number) {
		this.setRepository();
		//
		return this.medicamentos.findOne({id: id});
	}

	public static addMedicamento (data?: Object) {
		this.setRepository();
		const medicamento = new Medicamento();
		medicamento.name = "Marihuana";
		medicamento.price = 525.60;
		medicamento.description = "Te ayuda a pegarte un buen viaje";
		medicamento.expireDate = new Date("2020-12-012");
		//
		return this.medicamentos.save(medicamento);
	}	
}