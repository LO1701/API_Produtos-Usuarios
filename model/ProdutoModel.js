import { Sequelize } from "sequelize";
import db from "../configuracao/Database.js";
import Usuarios from "./UsuarioModel.js";

const {DataTypes} = Sequelize;

//(Descrição, valor R$, data de cadastro, quantidade, usuário responsável
const Produtos = db.define('produtos', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    valor:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    usuarioId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

//Criando a relacaao das tabelas (1 - n)  
Usuarios.hasMany(Produtos);
Produtos.belongsTo(Usuarios, {foreignKey: 'usuarioId'});

export default Produtos;