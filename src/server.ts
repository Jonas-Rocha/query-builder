import express, { Request, Response } from "express";
import { knex } from "./database/knex";

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  //aqui eu estou simplesmente recuperando o corpo da requisição, e usando para inserir no banco de dados.
  //o banco de dados esta sendo conectado pelo metodo knex() que estamos importando de knex.ts(que também esta se conectando com o knexfile.ts)
  // await knex("courses").insert({ name });

  await knex.raw("INSERT INTO courses (name) VALUES (?)", [name]);

  response.status(201).json();
});

app.listen(3333, () => console.log(`Server is running on port 3333`));
