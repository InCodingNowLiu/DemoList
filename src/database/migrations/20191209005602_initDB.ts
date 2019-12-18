import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  //create table
  knex.schema.createTable('USER', (t: Knex.TableBuilder) => {
    t.increments('user_id')
      .unsigned()
      .primary();
      
  });
}

export async function down(knex: Knex): Promise<any> {}
