import { dbOptions } from '../interfaces/dbOptions.interface';
import { createConnection, ConnectionOptions, Connection, getConnection } from 'typeorm';
import { Config } from '../config';

const mode = process.env.DYNO ? 'prod' : 'dev';

const config = new Config(mode);
let optionsDb: ConnectionOptions | dbOptions;

optionsDb = process.env.DYNO ? {type: 'postgres', url: process.env.DATABASE_URL } : config.db;

export class dbManager {
	public static open(callback: () => void) {
		createConnection(optionsDb as ConnectionOptions).then( connection => {
			console.log('Database connection is ', connection.isConnected);
			callback();
			//connection.close();
		});
	}

	public static close (): void {
		getConnection().close();
	}
}