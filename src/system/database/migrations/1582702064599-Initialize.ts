import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1582702064599 implements MigrationInterface {
    name = 'Initialize1582702064599'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "ventas" ("id" SERIAL NOT NULL, "isSold" boolean, "total" double precision, "deliveredDate" date, "sellDate" TIMESTAMP, "clienteId" integer, CONSTRAINT "PK_b8b73abe8561829c019531d9a2e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d5d44511558894f953d5cd40c4" ON "ventas" ("isSold") `, undefined);
        await queryRunner.query(`CREATE TABLE "medicamentos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, "expireDate" date NOT NULL, CONSTRAINT "PK_3985b0c130d1322e867f7ad5ee9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "promotores" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "registeredDate" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "birthDate" date NOT NULL, "socioId" integer, CONSTRAINT "PK_14c9ba7074021586f84f9fd4e45" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "socios" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "dim" character varying NOT NULL, "birthDate" date NOT NULL, "registeredDate" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_19aa081436e91864ec86a4bf912" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d95a1a36b6ffba8ac2316878a5" ON "socios" ("phone") `, undefined);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone1" character varying NOT NULL, "referencePhone" character varying, "address" character varying NOT NULL, "referenceAddress" character varying, "registeredDate" TIMESTAMP NOT NULL, "birthDay" date, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "citas" ("id" SERIAL NOT NULL, "citaDate" TIMESTAMP NOT NULL, "isPending" boolean NOT NULL, "clienteId" integer, CONSTRAINT "PK_43851fd780e10030fbe5bb1b912" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_29ff4c89a643832e1709685093" ON "citas" ("isPending") `, undefined);
        await queryRunner.query(`CREATE TABLE "lugares" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "agency" character varying NOT NULL, "colony" character varying NOT NULL, "district" character varying NOT NULL, "president" character varying NOT NULL, "phone" integer NOT NULL, "secretary" character varying NOT NULL, "isProfitable" boolean NOT NULL, "birthDate" date NOT NULL, "isContactable" boolean NOT NULL, "dealDate" date NOT NULL, CONSTRAINT "PK_2d35032f3ed96e34c17653efeb6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f7f4a831edde409e1f4abe047e" ON "lugares" ("isProfitable") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1ef07f4d649d95d37e069b7ca2" ON "lugares" ("isContactable") `, undefined);
        await queryRunner.query(`CREATE TABLE "ventas_sold_meds_medicamentos" ("ventasId" integer NOT NULL, "medicamentosId" integer NOT NULL, CONSTRAINT "PK_4ba82e4f3528d05ea3fc9cf58a5" PRIMARY KEY ("ventasId", "medicamentosId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_718dc4023e5a13d66edac75981" ON "ventas_sold_meds_medicamentos" ("ventasId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ae9ba11b5edf7d87c93f6d71e2" ON "ventas_sold_meds_medicamentos" ("medicamentosId") `, undefined);
        await queryRunner.query(`CREATE TABLE "socios_clientes_clientes" ("sociosId" integer NOT NULL, "clientesId" integer NOT NULL, CONSTRAINT "PK_c32624a55812cf8490605832042" PRIMARY KEY ("sociosId", "clientesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f02937c41c0f30521478089d7a" ON "socios_clientes_clientes" ("sociosId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ff13114e00e8fb782ff6fe9007" ON "socios_clientes_clientes" ("clientesId") `, undefined);
        await queryRunner.query(`CREATE TABLE "clientes_recommended_meds_medicamentos" ("clientesId" integer NOT NULL, "medicamentosId" integer NOT NULL, CONSTRAINT "PK_b33a581c11a1842d2b6dff7eb39" PRIMARY KEY ("clientesId", "medicamentosId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_add58b9da9f85b6cc1b6e32789" ON "clientes_recommended_meds_medicamentos" ("clientesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_31c3b0c278db9bb6e8d1f67d1b" ON "clientes_recommended_meds_medicamentos" ("medicamentosId") `, undefined);
        await queryRunner.query(`ALTER TABLE "ventas" ADD CONSTRAINT "FK_771620ab33741414f8248217fc3" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "promotores" ADD CONSTRAINT "FK_9c63bd198116df9b593e3dfc41c" FOREIGN KEY ("socioId") REFERENCES "socios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "citas" ADD CONSTRAINT "FK_bd7a62ee3d3d6c0e2a1bdcec63f" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ventas_sold_meds_medicamentos" ADD CONSTRAINT "FK_718dc4023e5a13d66edac75981d" FOREIGN KEY ("ventasId") REFERENCES "ventas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "ventas_sold_meds_medicamentos" ADD CONSTRAINT "FK_ae9ba11b5edf7d87c93f6d71e29" FOREIGN KEY ("medicamentosId") REFERENCES "medicamentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "socios_clientes_clientes" ADD CONSTRAINT "FK_f02937c41c0f30521478089d7a7" FOREIGN KEY ("sociosId") REFERENCES "socios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "socios_clientes_clientes" ADD CONSTRAINT "FK_ff13114e00e8fb782ff6fe90076" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes_recommended_meds_medicamentos" ADD CONSTRAINT "FK_add58b9da9f85b6cc1b6e327895" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes_recommended_meds_medicamentos" ADD CONSTRAINT "FK_31c3b0c278db9bb6e8d1f67d1ba" FOREIGN KEY ("medicamentosId") REFERENCES "medicamentos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "clientes_recommended_meds_medicamentos" DROP CONSTRAINT "FK_31c3b0c278db9bb6e8d1f67d1ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "clientes_recommended_meds_medicamentos" DROP CONSTRAINT "FK_add58b9da9f85b6cc1b6e327895"`, undefined);
        await queryRunner.query(`ALTER TABLE "socios_clientes_clientes" DROP CONSTRAINT "FK_ff13114e00e8fb782ff6fe90076"`, undefined);
        await queryRunner.query(`ALTER TABLE "socios_clientes_clientes" DROP CONSTRAINT "FK_f02937c41c0f30521478089d7a7"`, undefined);
        await queryRunner.query(`ALTER TABLE "ventas_sold_meds_medicamentos" DROP CONSTRAINT "FK_ae9ba11b5edf7d87c93f6d71e29"`, undefined);
        await queryRunner.query(`ALTER TABLE "ventas_sold_meds_medicamentos" DROP CONSTRAINT "FK_718dc4023e5a13d66edac75981d"`, undefined);
        await queryRunner.query(`ALTER TABLE "citas" DROP CONSTRAINT "FK_bd7a62ee3d3d6c0e2a1bdcec63f"`, undefined);
        await queryRunner.query(`ALTER TABLE "promotores" DROP CONSTRAINT "FK_9c63bd198116df9b593e3dfc41c"`, undefined);
        await queryRunner.query(`ALTER TABLE "ventas" DROP CONSTRAINT "FK_771620ab33741414f8248217fc3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_31c3b0c278db9bb6e8d1f67d1b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_add58b9da9f85b6cc1b6e32789"`, undefined);
        await queryRunner.query(`DROP TABLE "clientes_recommended_meds_medicamentos"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ff13114e00e8fb782ff6fe9007"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f02937c41c0f30521478089d7a"`, undefined);
        await queryRunner.query(`DROP TABLE "socios_clientes_clientes"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ae9ba11b5edf7d87c93f6d71e2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_718dc4023e5a13d66edac75981"`, undefined);
        await queryRunner.query(`DROP TABLE "ventas_sold_meds_medicamentos"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1ef07f4d649d95d37e069b7ca2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f7f4a831edde409e1f4abe047e"`, undefined);
        await queryRunner.query(`DROP TABLE "lugares"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_29ff4c89a643832e1709685093"`, undefined);
        await queryRunner.query(`DROP TABLE "citas"`, undefined);
        await queryRunner.query(`DROP TABLE "clientes"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d95a1a36b6ffba8ac2316878a5"`, undefined);
        await queryRunner.query(`DROP TABLE "socios"`, undefined);
        await queryRunner.query(`DROP TABLE "promotores"`, undefined);
        await queryRunner.query(`DROP TABLE "medicamentos"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d5d44511558894f953d5cd40c4"`, undefined);
        await queryRunner.query(`DROP TABLE "ventas"`, undefined);
    }

}
