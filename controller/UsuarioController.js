import Usuario from "../model/UsuarioModel.js";
import db from "../configuracao/Database.js";
import argon2 from "argon2";

export const getUsuario = async (req, res) => {
    try{
        const response = await Usuario.findAll();
        res.status(200).json(response);
    }catch{
        res.status(500).json({msg: error.message});
    }
}

export const postUsuario = (req, res) => {

}

export const patchUsuario = (req, res) => {

}

export const deleteUsuario = (req, res) => {

}