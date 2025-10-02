import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { mostrarTarefa, enviarTarefa } from "../controller/tarefaController.js";

const route = Router();

route.use(authMiddleware);

route.get('/', mostrarTarefa);
route.post('/', enviarTarefa);

export default route;