import { Router } from "express";
import { registrar, logar } from '../controller/authController.js'

const route = Router();

route.post('/register', registrar);
route.post('/login', logar);

export default route;