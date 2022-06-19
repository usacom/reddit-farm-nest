import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TokenTable1655577706358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'user',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'int',
    //         isPrimary: true,
    //         isGenerated: true,
    //         generationStrategy: 'increment',
    //       },
    //       {
    //         name: 'username',
    //         type: 'varchar(20)',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'password',
    //         type: 'varchar',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'isDeleted',
    //         type: 'boolean',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'createdAt',
    //         type: 'timestamp',
    //         default: 'now()',
    //       },
    //       {
    //         name: 'updatedAt',
    //         type: 'timestamp',
    //         default: 'now()',
    //       },
    //     ],
    //   }),
    //   false,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`DROP TABLE article`);
  }
}
