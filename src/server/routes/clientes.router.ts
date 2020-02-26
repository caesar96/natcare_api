import * as Koa from 'koa';
import * as Router from 'koa-router';
import {ClienteController} from '../../system/controllers';

class Authorize {
	public static protected() {
		return async (app: Koa.Context, next: () => void ) => {
			console.log("Página protegida:", app.request.href);
			return next();
		}
	}
}

export class Clientes {
	private router: Router;
	//
	constructor () {
		this.router = new Router ({ prefix: '/clientes' });
		this.setPostRouters();
		this.setGetRouters ();
	}

	setGetRouters (): void {
		// HOME 
		this.router.get('/', async (app: Koa.Context) => {
			const clientes = await ClienteController.getClientes();
			app.set('Content-Type', 'application/json');
			if (clientes.length > 0) {
				app.body = clientes;
			}
			else
				app.body = {error: true, message: "No hay clientes"};
		});
	
		// REGISTRAR CLIENTE
		this.router.get('/registrar', async (app: Koa.Context) => {
			app.body = '<h1>Registrar Clientes xDD</h1>';
		});

		this.router.get('/:id', Authorize.protected(), async (app: Koa.Context) => {
			let id: number = parseInt( app.params.id );
			const result = await ClienteController.getCliente(id);
			console.log(result);
			//
			app.set('Content-Type', 'application/json');
			if (!!result)
				app.body = result;
			else
				app.body = {error: true, message: "Ningún resultado para el cliente con ID " + id};
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