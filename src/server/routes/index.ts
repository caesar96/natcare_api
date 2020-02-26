import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Clientes } from './clientes.router';
import { Medicamentos } from './medicamentos.router'
import {Socios} from './socios.router';

export class Routes {
	private router: Router;
	constructor () {
		this.init();
		this.setup ()
	}

	init () {
		this.router = new Router({prefix: '/api/v1'});
		this.router.get('/', async (app: Koa.Context) => {
			app.status = 105;
		});
	}

	setup () {
		this.router.use((new Socios).routes);
		this.router.use((new Medicamentos).routes);
		this.router.use((new Clientes).routes);
	}

	get getAll () {
		return this.router.routes();
	}
}