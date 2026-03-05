// Importa a função "knex" da biblioteca Knex e renomeia para "knexConfig"
// para evitar conflito com a variável "knex" que será exportada abaixo.
import { knex as knexConfig } from "knex";

// Importa as configurações do banco definidas no knexfile
import config from "../../knexfile";

// Cria e exporta uma instância do knex já configurada com as opções do knexfile
export const knex = knexConfig(config);

/*
    Uma curiosidade que quase ninguém explica:
    Você pode criar várias instâncias do knex se quiser

    Exemplo:
    const db1 = knex(config1);
    const db2 = knex(config2);

 */
