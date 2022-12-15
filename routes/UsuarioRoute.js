import express from "express";
import {
    getUsuario,
    postUsuario,
    patchUsuario,
    deleteUsuario
} from "../controller/UsuarioController.js";

const router = express.Router();

router.get('/usuario', getUsuario);
router.post('/usuario', postUsuario);
router.patch('/usuario/:id', patchUsuario);
router.delete('/usuario/:id', deleteUsuario);

export default router;
