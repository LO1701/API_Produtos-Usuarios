import Produto from "../model/ProdutoModel.js";
import Usuario from "../model/UsuarioModel.js";
import {Op} from "sequelize";

export const getProdutos = async(req, res) => {
    let response;

    try{
        if(req.role === "admin"){
            response = await Produto.findAll({
                include:[{
                    model: Usuario,
                    attributes:['nome', 'email', 'role']
                }]
            }); 
        }else{
            response = await Produto.findAll({
                where:{
                    usuarioId: req.userId
                },
                include:[{
                    model: Usuario,
                    attributes:['nome', 'email', 'role']
                }]
            });
        }
        if(response.length === 0)
            return res.status(404).json({msg: "Nenhum produto foi encontrado"});
        
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({msg: error.message});
    }
}

export const postProdutos = async(req, res) => {
    const {nome, descricao, valor, quantidade} = req.body;
    try{
        await Produto.create({
            nome: nome,
            descricao: descricao,
            valor: valor,
            quantidade: quantidade,
            usuarioId: req.userId
        });
        res.status(201).json({msg: "Produto criado com sucesso"});
    }catch(error){
        return res.status(500).json({msg: error.message});
    }
}

export const patchProdutos = async(req, res) => {
    const {nome, descricao, valor, quantidade} = req.body;
    try{
        const produto = await Produto.findOne({
            where:{
                uuid: req.params.id
            }
        });

        if(!produto) return res.status(404).json({msg: "Produto não encontrado"});

        if(req.role === "admin"){
            await Produto.update({
                nome: nome,
                descricao: descricao,
                valor: valor,
                quantidade: quantidade
            },{
                where:{
                    id: produto.id
                }
            });
        }else{
            if(req.userId !== produto.usuarioId)
                return res.status(403).json({msg: "Usuario não possui permissão"});
            
            await Produto.update({
                nome: nome,
                descricao: descricao,
                valor: valor,
                quantidade: quantidade
            },{
                where:{
                    [Op.and]:[{id: produto.id}, {usuarioId: req.userId}]
                }
            });
        }

        res.status(200).json({msg: "Produto alterado com sucesso"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const deleteProdutos  = async(req, res) => {
    try{
        const produto = await Produto.findOne({
            where:{
                uuid: req.params.id
            }
        });

        if(!produto) return res.status(404).json({msg: "Produto não encontrado"});

        if(req.role === "admin"){
            await Produto.destroy({
                where:{
                    id: produto.id
                }
            });
        }else{
            if(req.userId !== produto.usuarioId)
                res.status(403).json({msg: "Usuario não possui permissão"});
            
            await Produto.destroy({
                where:{
                    [Op.and]:[{id: produto.id}, {usuarioId: req.userId}]
                }
            });
        }

        res.status(200).json({msg: "Produto excluído com sucesso"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}