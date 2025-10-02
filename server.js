import express from "express";
import authRoutes from './routes/auth.js';
import tarefaRoutes from './routes/tarefas.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/tarefa', tarefaRoutes);

app.listen(PORT, () => {
    console.log(`Conectado na porta ${PORT}`);
});