import express from "express";
import {
    getProdutos,
    postProdutos,
    patchProdutos,
    deleteProdutos
} from "../controller/ProdutoController.js"

const router = express.Router();

router.get('/produto', getProdutos);
router.post('/produto', postProdutos);
router.patch('/produto/:id', patchProdutos);
router.delete('/produto/:id', deleteProdutos);

export default router;