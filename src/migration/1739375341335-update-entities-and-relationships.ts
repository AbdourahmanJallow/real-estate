import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntitiesAndRelationships1739375341335 implements MigrationInterface {
    name = 'UpdateEntitiesAndRelationships1739375341335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP CONSTRAINT "FK_7a336fffc5b8dedce69a13f43a6"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "image" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "review" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "review" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "offer" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "description" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."property_transaction_status_enum" AS ENUM('pending', 'completed', 'failed', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "status" "public"."property_transaction_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "paymentRefrence" character varying`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "currency" character varying NOT NULL DEFAULT 'GMD'`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "updatedById" integer`);
        await queryRunner.query(`ALTER TABLE "viewing" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "viewing" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin_activity_log" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin_activity_log" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD CONSTRAINT "FK_b97544af9444cf61c74e2b76177" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD CONSTRAINT "FK_1f49627d5f212c3d5e6194e68e1" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP CONSTRAINT "FK_1f49627d5f212c3d5e6194e68e1"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP CONSTRAINT "FK_b97544af9444cf61c74e2b76177"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "admin_activity_log" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "admin_activity_log" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "viewing" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "viewing" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "paymentRefrence"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."property_transaction_status_enum"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property_transaction" ADD CONSTRAINT "FK_7a336fffc5b8dedce69a13f43a6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
