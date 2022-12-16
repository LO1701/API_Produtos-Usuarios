import express from "express";
import {
    getUsuario,
    postUsuario,
    patchUsuario,
    deleteUsuario
} from "../controller/UsuarioController.js";
import { vereficarUsuario, vereficarAdmin } from "../middleware/AuthUsuario.js";

const router = express.Router();

router.get('/usuario', vereficarUsuario, vereficarAdmin, getUsuario);
router.post('/usuario', vereficarUsuario, vereficarAdmin, postUsuario);
router.patch('/usuario/:id', vereficarUsuario, vereficarAdmin, patchUsuario);
router.delete('/usuario/:id', vereficarUsuario, vereficarAdmin, deleteUsuario);

export default router;
