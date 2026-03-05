import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("course_modules", (table) => {
    (table.increments("id").primary(),
      table.text("name").notNullable(),
      //aqui eu estou criando e conectando a tabela "course_id" que esta referenciado diretamente a tabela "id" de "courses"
      table.integer("course_id").references("id").inTable("courses"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("course_modules");
}
