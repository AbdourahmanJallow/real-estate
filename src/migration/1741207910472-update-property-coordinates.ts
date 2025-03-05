import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePropertyCoordinates1741207910472
  implements MigrationInterface
{
  name = 'UpdatePropertyCoordinates1741207910472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "latitude"`);
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "latitude"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "longitude"`);
    await queryRunner.query(`ALTER TABLE "property" ADD "coordinates" json`);
    await queryRunner.query(`ALTER TABLE "user" ADD "coordinates" json`);
    await queryRunner.query(
      `ALTER TABLE "property" ALTER COLUMN "availabilityStatus" DROP DEFAULT`
    );
    await queryRunner.query(
      `UPDATE "property" SET "amenities" = '{}' WHERE "amenities" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "property" ALTER COLUMN "amenities" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "property" ALTER COLUMN "amenities" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "property" ALTER COLUMN "availabilityStatus" SET DEFAULT 'not_available'`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coordinates"`);
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "coordinates"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "longitude" double precision`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "latitude" double precision`
    );
    await queryRunner.query(`ALTER TABLE "property" ADD "longitude" integer`);
    await queryRunner.query(`ALTER TABLE "property" ADD "latitude" integer`);
  }
}
