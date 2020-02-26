import * as Koa from 'koa';
import * as Router from 'koa-router';
import {SocioController} from '../../system/controllers';
import  { Auth } from '../auth';

export class Socios {
	private router: Router;
	//
	constructor () {
		this.router = new Router ({ prefix: '/socios' });
		this.setPostRouters();
		this.setGetRouters ();
	}

	setGetRouters (): void {
		// HOME 
		this.router.get('/', Auth.Protected(), async (app: Koa.Context) => {
			const result = await SocioController.getSocios();
			app.set('Content-Type', 'application/json');
			console.log(app.state.socio);
			if (!!result)
				app.body = result;
			else {
				app.status = 404;
				app.body = {error: true, message: "No existen socios todavía"};
			}
		});	
		this.router.get('/:id', Auth.Protected(), async (app: Koa.Context) => {
			let id: number = parseInt( app.params.id );
			const result = await SocioController.getSocio(id);
			app.set('Content-Type', 'application/json');
			console.log(app.state.socio);
			if (!!result)
				app.body = result;
			else {
				app.status = 404;
				app.body = {error: true, message: "No existe el socio con el ID " + id};
			}
		});
		this.router.get('/phone/:phone', Auth.Protected(), async (app: Koa.Context) => {
			let phone = app.params.phone;
			const result = await SocioController.getSocioByPhoneNumber(phone);
			app.set('Content-Type', 'application/json');
			console.log(app.state.socio);
			if (!!result)
				app.body = result;
			else {
				app.status = 404;
				app.body = {error: true, message: "No existe el socio con el teléfono:  " + phone};
			}
		});			
	}

	setPostRouters (): void {
		this.router.post('/authenticate', async (app: Koa.Context) => {
			app.set('Content-Type', 'application/json');
			const result = await SocioController.authenticateSocio(app.request.body.phone, app.request.body.password);
			const token = await Auth.GenToken(result.data);
			app.body = {token: token, socio: result.data};
		});

		this.router.post('/add', async (app: Koa.Context) => {
			console.log(app.request.body);
			const result = await SocioController.add(app.request.body);
			app.set('Content-Type', 'application/json');
			app.body = result;
		});
	}

	get routes () {
		return this.router.routes();
	}


}