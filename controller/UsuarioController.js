import Usuario from "../model/UsuarioModel.js";
import db from "../configuracao/Database.js";
import argon2 from "argon2";

export const getUsuario = async (req, res) => {
    try{
        const response = await Usuario.findAll({
            attributes:['uuid', 'nome', 'email', 'role']
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const postUsuario = async (req, res) => {
    const {nome, email, senha, confirmaSenha, role} = req.body;

    if(senha !== confirmaSenha)
        return res.status(400).json({msg: "Senha diferente da confirmação"});
    
    const hashSenha = await argon2.hash(senha);        
    
    try{
        await Usuario.create({
            nome: nome,
            email: email,
            senha: hashSenha,
            role: role
        });
        res.status(201).json({msg: "Usuario criado com sucesso"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const patchUsuario = async (req, res) => {
    const usuario = await Usuario.findOne({
        where: {
            uuid: req.params.id
        }
    });
    
    if(!usuario)
        return res.status(404).json({msg: "Usuario não encontrado"});

    const  {nome, email, senha, confirmaSenha, role} = req.body;
    let hashSenha;
    
    if(senha === "" || senha === null){
        hashSenha = usuario.senha; 
    }else{
        hashSenha = await argon2.hash(senha);
    }

    if(senha !== confirmaSenha)
        return res.status(400).json({msg: "Senha diferente da confirmação"})
    try{
        await Usuario.update({
            nome: nome,
            email: email,
            senha: hashSenha,
            role: role
        },{
            where:{
                id: usuario.id
            }
        });
        res.status(200).json({msg: "Usuario alterado com sucesso"});
    }catch(error){
        res.status(400).json({msg:error.message});
    }
}

export const deleteUsuario = async (req, res) => {
    const user = await Usuario.findOne({
        where: {
            uuid: req.params.id
        }
    });
    
    if(!user)
        return res.status(404).json({msg: "Usuario não encontrado"});

    try{
        await Usuario.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Usuario apagado com sucesso"});
    }catch(error){
        res.status(400).json({msg:error.message});
    }
}