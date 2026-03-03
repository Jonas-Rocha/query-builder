//npm run knex -- migrate:make add-updated-courses << foi usado para criar
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.timestamp("updated_at").defaultTo(knex.fn.now()).after("created_at"); //o after() serve para dizer que a coluna deve ser DEPOIS de created_at

  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("courses", (table) => {
        table.dropColumn("updated_at")
    })
}
