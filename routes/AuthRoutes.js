import express from "express";
import {
    login,
    logOut,
    verificarLogin
} from "../controller/Auth.js"

const router = express.Router();

router.get('/auth', verificarLogin);
router.post('/auth', login);
router.delete('/auth', logOut);

export default router;