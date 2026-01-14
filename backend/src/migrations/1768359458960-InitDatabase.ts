import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1768359458960 implements MigrationInterface {
    name = 'InitDatabase1768359458960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`status\` enum ('SUCCESS', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'PENDING', \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`article\``);
    }

}
