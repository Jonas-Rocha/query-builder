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

// Criando um modulo para um curso
app.post("/modules", async (request: Request, response: Response) => {
  const { name, course_id } = request.body;

  await knex("course_modules").insert({ name, course_id });

  return response.status(201).json();
});

// Listando os modulos
app.get("/modules", async (request: Request, response: Response) => {
  const modules = await knex("course_modules").select();

  return response.json(modules);
});

app.get(
  "/courses/:id/modules",
  async (request: Request, response: Response) => {
    const courses = await knex("courses")
      .select(
        "courses.id AS course_id",
        "course_modules.id AS module_id",
        "course_modules.name AS module",
        "courses.name AS course",
      ) // se nas duas tabelas eu tenho colunas de nomes iguais, é bom renomear para não dar ambiguidade, e também para ficar mais intuitivo na hora de ver os dados.
      .join("course_modules", "courses.id", "course_modules.course_id"); //courses.id("id" dentro de courses é a chave primária de courses)  e course_modules.course_id("course_id" é a chave estrangeira de course_modules), estamos conectando as duas para conectar as duas tabelas.

    return response.json(courses);
  },
);

app.listen(3333, () => console.log(`Server is running on port 3333`));
