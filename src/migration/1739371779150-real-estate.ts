import { MigrationInterface, QueryRunner } from "typeorm";

export class RealEstate1739371779150 implements MigrationInterface {
    name = 'RealEstate1739371779150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "filename" character varying NOT NULL, "size" integer NOT NULL, "propertyId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "rating" integer NOT NULL, "userId" integer, "propertyId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."offer_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "status" "public"."offer_status_enum" NOT NULL, "propertyId" integer, "userId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."property_transaction_type_enum" AS ENUM('purchase', 'rental')`);
        await queryRunner.query(`CREATE TABLE "property_transaction" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."property_transaction_type_enum" NOT NULL, "userId" integer, "propertyId" integer, CONSTRAINT "PK_4b297ca9bf4ea32a334fe68f089" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."viewing_status_enum" AS ENUM('pending', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "viewing" ("id" SERIAL NOT NULL, "scheduledDate" TIMESTAMP NOT NULL, "status" "public"."viewing_status_enum" NOT NULL DEFAULT 'pending', "userId" integer, "propertyId" integer, CONSTRAINT "PK_9e8233ae4b4be4777fd84d9d981" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."property_status_enum" AS ENUM('available', 'rented')`);
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "location" character varying NOT NULL, "status" "public"."property_status_enum" NOT NULL, "agentId" integer, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_activity_log" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "adminId" integer, CONSTRAINT "PK_40c01e852203c41a67f9a1a47a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'agent', 'tenant')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'tenant', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_e87199b269a72d071b3f4ff3b02" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_d5fcfc0cc81813136b646d2a5a1" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_924bb829fb8bd1a20e7c1855d98" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD CONSTRAINT "FK_7a336fffc5b8dedce69a13f43a6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD CONSTRAINT "FK_5838c394d09cef7b35a6ae36e25" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewing" ADD CONSTRAINT "FK_10550f87fd2c29d769ce2e84911" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "viewing" ADD CONSTRAINT "FK_e617daf66b5b88da88c44cf156b" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_3df22387cc25ecbbe851a57fd32" FOREIGN KEY ("agentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin_activity_log" ADD CONSTRAINT "FK_f25dbb09d1c1c44fc5862865e08" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_activity_log" DROP CONSTRAINT "FK_f25dbb09d1c1c44fc5862865e08"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_3df22387cc25ecbbe851a57fd32"`);
        await queryRunner.query(`ALTER TABLE "viewing" DROP CONSTRAINT "FK_e617daf66b5b88da88c44cf156b"`);
        await queryRunner.query(`ALTER TABLE "viewing" DROP CONSTRAINT "FK_10550f87fd2c29d769ce2e84911"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP CONSTRAINT "FK_5838c394d09cef7b35a6ae36e25"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP CONSTRAINT "FK_7a336fffc5b8dedce69a13f43a6"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_e8100751be1076656606ae045e3"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_924bb829fb8bd1a20e7c1855d98"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_d5fcfc0cc81813136b646d2a5a1"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_e87199b269a72d071b3f4ff3b02"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "admin_activity_log"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TYPE "public"."property_status_enum"`);
        await queryRunner.query(`DROP TABLE "viewing"`);
        await queryRunner.query(`DROP TYPE "public"."viewing_status_enum"`);
        await queryRunner.query(`DROP TABLE "property_transaction"`);
        await queryRunner.query(`DROP TYPE "public"."property_transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_status_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
