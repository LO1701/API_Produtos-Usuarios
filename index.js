import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize"; // dependencia para manter o login do user
import dotenv from "dotenv";
import UsuarioRoute from "./routes/UsuarioRoute.js";
import ProdutoRoute from "./routes/ProdutoRoutes.js";
import AuthRoute from "./routes/AuthRoutes.js";
import db from "./configuracao/Database.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//Fazendo a criacao do BD
//(async () =>{ 
//    await db.sync();
//})();

app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
    store: store,
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
app.use(AuthRoute); //Utilização da rota auth

// store.sync();

//rodando o server na porta 5000
app.listen(5000, () =>{ 
    console.log("Servidor OK");
});

