export interface dbOptions {
    readonly type?: "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "oracle" | "mongodb" | "cordova" | "react-native" | "expo" | "nativescript" | "sqljs";
    readonly host: string;
    readonly port: number;
    readonly url?: string;
    readonly username: string;
    readonly password: string;
    readonly database: string;
    readonly synchronize: boolean;
    readonly migrationsRun:boolean;
    readonly logging: boolean;
    readonly entities: string[];
    readonly migrations: string[];
}