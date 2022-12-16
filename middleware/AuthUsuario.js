import Usuario from "../model/UsuarioModel.js";

export const vereficarUsuario = async (req, res, next) => {
    if(!req.session.userId)
    return res.status(401).json({msg: "Faça o login"});

    const usuario = await Usuario.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!usuario) 
        return res.status(404).json({msg: "Usuario não encontrado"});

    req.userId = usuario.id;
    req.role = usuario.role;
    next();
}

export const vereficarAdmin = async (req, res, next) => {

    if(req.role !== "admin")
        return res.status(403).json({msg: "Usuario não possui permissão"});
    
    next();
}