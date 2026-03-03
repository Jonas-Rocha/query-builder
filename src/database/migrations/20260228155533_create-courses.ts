import type { Knex } from "knex";

//a função up() é responsável por criar/enviar as mudanças para as tabelas do banco de dados.
//ambas recebem o knex como metodo para receber os metodos dele.
export async function up(knex: Knex): Promise<void> {
  //como é uma função async, devemos usaro await
  //usando o knex. temos acesso a vários metodos prontos do knex, como o createTable(), por exemplo.
  await knex.schema.createTable("courses", (table) => {
    //aqui "table" é = coluna.
    //increments é para autoincrementar sempre um "id", e é chave primary(PRIMARY KEY).
    (table.increments("id").primary(),
      table.text("name").notNullable(),
      table.timestamp("created_at").defaultTo(knex.fn.now())); //dentro do knex.  temos o fn. que são funções prontas.
  });
}

// a função down() é para desfazer as mudanças.
//ambas recebem o knex como metodo para receber os metodos dele.
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("courses");
}
