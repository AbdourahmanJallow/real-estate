import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedNewTables1741018505034 implements MigrationInterface {
  name = 'AddedNewTables1741018505034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "propertyId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."property_status_enum"`);
    await queryRunner.query(`ALTER TABLE "property" ADD "latitude" integer`);
    await queryRunner.query(`ALTER TABLE "property" ADD "longitude" integer`);
    await queryRunner.query(
      `CREATE TYPE "public"."property_availabilitystatus_enum" AS ENUM('not_available', 'available', 'rented')`
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD "availabilityStatus" "public"."property_availabilitystatus_enum" NOT NULL DEFAULT 'not_available'`
    );
    await queryRunner.query(`ALTER TABLE "property" ADD "amenities" text`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "latitude" double precision`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "longitude" double precision`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profilePictureId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_f58f9c73bc58e409038e56a4055" UNIQUE ("profilePictureId")`
    );
    await queryRunner.query(
      `ALTER TABLE "property_transaction" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE "property_transaction" ADD "amount" double precision NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_ccdc459572d1ae97dea4281fb3b" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_71fb36906595c602056d936fc13" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_71fb36906595c602056d936fc13"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_ccdc459572d1ae97dea4281fb3b"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`
    );
    await queryRunner.query(
      `ALTER TABLE "property_transaction" DROP COLUMN "amount"`
    );
    await queryRunner.query(
      `ALTER TABLE "property_transaction" ADD "amount" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_f58f9c73bc58e409038e56a4055"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "profilePictureId"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "latitude"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "amenities"`);
    await queryRunner.query(
      `ALTER TABLE "property" DROP COLUMN "availabilityStatus"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."property_availabilitystatus_enum"`
    );
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `CREATE TYPE "public"."property_status_enum" AS ENUM('available', 'rented')`
    );
    await queryRunner.query(
      `ALTER TABLE "property" ADD "status" "public"."property_status_enum" NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "favorite"`);
  }
}
