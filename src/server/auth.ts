import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';

export class Auth {

	public static Protected () {
		return async (app: Koa.Context, next: () => void ) => {
			let token: string;
			let data: any;
			app.set('Content-Type', 'application/json');
			console.log("Página protegida:", app.request.href);
			try {
				if ( typeof (app.request.headers.authorization) != "undefined") {
					token = app.request.headers.authorization.replace("Bearer ", "");
					data = await this.validToken (token);
					if (!!data) {
						app.state.socio = data.data;
						return next();
					}
				}
			}
			catch (e) {

			}
			app.status = 403;
			app.body = {error: true, message: "Acceso denegado"};
		}
	}

	public static async GenToken (data: any) {
		return await jwt.sign({data: data}, "tumamaeshombremonamigetback");
	}

	public static async validToken (token: string) {
		return await jwt.verify(token, "tumamaeshombremonamigetback");
	}
}