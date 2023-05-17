import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserVerificationTable1684294059756
  implements MigrationInterface
{
  name = 'AddUserVerificationTable1684294059756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_verifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`verification_code\` varchar(255) NOT NULL, \`verified_at\` datetime NULL, \`expired_at\` datetime NULL, \`type\` enum ('register', 'forgotpassword') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_verifications\``);
  }
}
