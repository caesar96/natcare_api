import * as Koa from 'koa';
import * as Router from 'koa-router';
import {MedicamentosController} from '../../system/controllers';
import  { Auth } from '../auth';

export class Medicamentos {
	private router: Router;
	//
	constructor () {
		this.router = new Router ({ prefix: '/medicamentos' });
		this.setPostRouters();
		this.setGetRouters ();
	}

	setGetRouters (): void {
		// HOME 
		this.router.get('/', async (app: Koa.Context) => {
			const medicamentos = await MedicamentosController.getMedicamentos();
			app.set('Content-Type', 'application/json');
			if (medicamentos.length > 0) {
				app.body = medicamentos;
			}
			else
				app.body = {error: true, message: "No hay medicamentos jajajaja :("};
		});
	
		// AGREGAR MEDICAMENTO
		this.router.get('/add', Auth.Protected(), async (app: Koa.Context) => {
			const result = await MedicamentosController.addMedicamento();
			console.log(result);
			//
			app.set('Content-Type', 'application/json');
			if (!!result)
				app.body = result;
			else
				app.body = {error: true, message: "No se agregó ningún medicamento"};
		});

		this.router.get('/edit/:id', Auth.Protected(), async (app: Koa.Context) => {
			app.body = {error: true, message: "No se puede editar por el momento xDD", socio: app.state.socio};
		});		

		this.router.get('/:id', Auth.Protected(), async (app: Koa.Context) => {
			let id: number = parseInt( app.params.id );
			const result = await MedicamentosController.getMedicamento(id);
			console.log(result);
			//
			app.set('Content-Type', 'application/json');
			if (!!result)
				app.body = result;
			else
				app.body = {error: true, message: "No existe medicamento con el ID " + id};
			//
		});			
	}

	setPostRouters (): void {
		this.router.post('/', (app: Koa.Context) => {

		});
	}	

	get routes () {
		return this.router.routes();
	}


}