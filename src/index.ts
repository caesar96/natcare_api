import 'reflect-metadata';
import { Server } from './server';
import { dbManager } from './system';

dbManager.open (() => {

	(new Server).start(() => {
		console.log ('Servidor HTTP iniciado en http://localhost:5000');
	});
	
});