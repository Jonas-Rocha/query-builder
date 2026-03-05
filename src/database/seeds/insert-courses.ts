import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("courses").insert([
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Git" },
    { name: "GitHub" },
    { name: "TypeScript" },
    { name: "Express.js" },
    { name: "Banco de dados" },
  ]);
}
