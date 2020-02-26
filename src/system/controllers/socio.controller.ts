import { getConnection, Repository } from 'typeorm'
import { Socio } from '../entities/Socio.entity';
import * as bcrypt from 'bcryptjs';

export class SocioController {

	private static socios: Repository<Socio>;
	private static isRepositorySet: boolean = false;

	private static setRepository() {
		if (!this.isRepositorySet) {
			const conn = getConnection();
			this.socios = conn.getRepository(Socio);
			this.isRepositorySet = true;
		}
	}

	public static getSocios () {
		this.setRepository();
		//
		return this.socios.find();
	}

	public static getSocio (id: number) {
		this.setRepository();
		//
		return this.socios.findOne({id: id});
	}

	public static getSocioByPhoneNumber (phone: string) {
		this.setRepository();
		//
		return this.socios.findOne({
			where: { 
				phone: phone
			} 
		});
	}

	public static async authenticateSocio(phone: string, password: string) {
		this.setRepository();
		let socio: Socio;
		if (!!phone) {
			if (phone.length < 10 || phone.length > 10)
				return Promise.resolve({data: {}, message: "El número de telefono debe ser valido."});
			if (isNaN(parseInt(phone)))
				return Promise.resolve({data: {}, message: "El número de telefono debe ser un número."});
		}
		if (!!password) {
			if (password.length < 9)
				return Promise.resolve({data: {}, message: "La contraseña no debe ser menor a 8 caracteres."});
			//
			socio = await this.socios.findOne({
				 where: { 
				 	phone: phone
				 } 
			});

			console.log(socio);
			if (!socio)
				return Promise.resolve({data: {}, message: "No existe este socio en el registro."});
			if (!(await this.isValidPassword(password, socio.password)))
				return Promise.resolve({data: {}, message: "Contraseña incorrecta."});

			delete socio.password;
			delete socio.dim;
			delete socio.registeredDate;
			delete socio.birthDate;
			return Promise.resolve({data: socio});
		}
	}

	public static async add (_data: any) {
		this.setRepository();
		let socio = new Socio();
		socio.firstName = _data.firstname;
		socio.lastName = _data.lastname;
		socio.password = await this.hashPassword(_data.password);
		socio.dim = _data.dim;
		socio.birthDate = new Date(_data.date);
		socio.registeredDate = new Date();
		socio.phone = _data.phone;
		return this.socios.save(socio);
	}

	public static async hashPassword (password: string) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	public static async isValidPassword (password: string, hashedPassword: string): Promise<boolean> {
		const isValidPwd = await bcrypt.compare(password, hashedPassword);
		return isValidPwd;
	}	
}