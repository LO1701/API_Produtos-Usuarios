import express from "express";
import {
    getProdutos,
    postProdutos,
    patchProdutos,
    deleteProdutos
} from "../controller/ProdutoController.js"
import {vereficarUsuario} from "../middleware/AuthUsuario.js"


const router = express.Router();

router.get('/produto', vereficarUsuario, getProdutos);
router.post('/produto', vereficarUsuario, postProdutos);
router.patch('/produto/:id', vereficarUsuario, patchProdutos);
router.delete('/produto/:id', vereficarUsuario, deleteProdutos);

export default router;