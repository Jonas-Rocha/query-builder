import express, { Request, Response } from "express";
import { knex } from "./database/knex";

const app = express();
app.use(express.json());

//Criar
app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  //aqui eu estou simplesmente recuperando o corpo da requisição, e usando para inserir no banco de dados.
  //o banco de dados esta sendo conectado pelo metodo knex() que estamos importando de knex.ts(que também esta se conectando com o knexfile.ts)
  await knex("courses").insert({ name });

  // await knex.raw("INSERT INTO courses (name) VALUES (?)", [name]);

  return response.status(201).json();
});

//Listar
app.get("/courses", async (request: Request, response: Response) => {
  // const courses = await knex.raw("SELECT * FROM courses");
  const courses = await knex("courses").select().orderBy("name", "desc");

  return response.json(courses);
});

//Atualizar
app.put("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;

  await knex("courses").update({ name }).where({ id });

  return response.json();
});

//Deletar
app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  await knex("courses").delete().where({ id });

  return response.json();
});

app.listen(3333, () => console.log(`Server is running on port 3333`));
