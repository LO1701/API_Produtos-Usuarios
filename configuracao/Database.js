import sequelize, { Sequelize } from "sequelize";

const db = new Sequelize('CRUD_TXAI_TESTE', 'root', '1234', {
    host: "localhost",
    dialect: "mysql", 
});

export default db;