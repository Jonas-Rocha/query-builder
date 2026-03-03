// Aqui eu estou importando o proprio knex e renomeando para knexConfig para não confundir, e estou passando as configs que eu setei em knexfile.ts
import { knex as knexConfig } from "knex";
import config from "../../knexfile";

export const knex = knexConfig(config);
