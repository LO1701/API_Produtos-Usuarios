import { Sequelize } from "sequelize";
import db from "../configuracao/Database.js";

const {DataTypes} = Sequelize;

const Usuarios = db.define('usuarios', {
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
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Usuarios;