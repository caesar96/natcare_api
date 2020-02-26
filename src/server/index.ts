import { Config } from '../system/config';
import * as Koa from 'koa';
import * as KoaBody from 'koa-bodyparser';

import { Routes } from './routes'
const routes = new Routes();

export class Server {
	private app: Koa;
	private port: number;

	constructor () {
		this.port = 5000;
		this.app = new Koa;
		this.setup();
	}

	private setup (): void {
		this.app.use(KoaBody());
		this.app.use(routes.getAll);
	}

	public start (callback: () => void ): void {
		const serverPort = parseInt(process.env.PORT);
		//
		!isNaN(serverPort) && (this.port = serverPort);
		//
		this.app.listen(this.port, callback);
	}
}