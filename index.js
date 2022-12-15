import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UsuarioRoute from "./routes/UsuarioRoute.js";
import ProdutoRoute from "./routes/ProdutoRoutes.js";
//import db from "./configuracao/Database.js";

dotenv.config();

const app = express();

//Fazendo a criacao do BD
//(async () =>{ 
//    await db.sync();
//})();

app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' //dominio que vai rodar a porta do react
}));

app.use(express.json()); //Express vai utilizar json
app.use(UsuarioRoute); //Utilização da rota usuario
app.use(ProdutoRoute); //Utilização da rota produto

//rodando o server na porta 5000
app.listen(5000, () =>{ 
    console.log("Servidor OK");
});

