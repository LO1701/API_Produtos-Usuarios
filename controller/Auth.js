import Usuario from "../model/UsuarioModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const usuario = await Usuario.findOne({
        where:{
            email: req.body.email
        }
    });

    if(!usuario)
        return res.status(404).json({msg: "Usuario não encontrado"});

    const verificarSenha = await argon2.verify(usuario.senha, req.body.senha);

    if(!verificarSenha)
        return res.status(400).json({msg: "Senha incorreta"});

    req.session.userId = usuario.uuid;
    
    const nome = usuario.nome;
    const email = usuario.email;
    const role = usuario.role;
    res.status(200).json({nome, email, role});  
}

export const verificarLogin = async (req, res) => {
    if(!req.session.userId)
        return res.status(401).json({msg: "Faça o login"});
    
    const usuario = await Usuario.findOne({
        attributes:['uuid','nome','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!usuario) 
        return res.status(404).json({msg: "Usuario não encontrado"});
    
    res.status(200).json(usuario);
}

export const logOut = async (req, res) => {
    req.session.destroy((err)=>{
        if(err)
            return res.status(400).json({msg: "Não foi possível sair"});
        
        return res.status(200).json({msg: "Saiu"});
    });
} 