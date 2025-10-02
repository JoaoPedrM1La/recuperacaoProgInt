import { getDataTarefa, createTarefa } from "../utils/db.js";

export const mostrarTarefa = async (req, res) => {
    try {
        const users = getDataTarefa();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const enviarTarefa = (req, res) => {
    const {titulo, texto } = req.body;

    try {
        const result = createTarefa(titulo, texto);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}