import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshToken1744200149231 implements MigrationInterface {
    name = 'AddRefreshToken1744200149231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
