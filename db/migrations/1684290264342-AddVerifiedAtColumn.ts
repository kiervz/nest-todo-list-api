import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerifiedAtColumn1684290264342 implements MigrationInterface {
  name = 'AddVerifiedAtColumn1684290264342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`verified_at\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`verified_at\``,
    );
  }
}
