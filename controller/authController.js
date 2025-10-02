import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';
import { createData, getDadoByNome } from '../utils/db.js';

const hashPassword = (senha) => {
    const hashedPassword = bcrypt.hashSync(senha, 8);
    return hashedPassword;
}

const comparePassword = (senha, userSenhaHash) => {
    if (!bcrypt.compareSync(senha, userSenhaHash)) {
        return false;
    }

    return true;
}

export const registrar = (req, res) => {
    const  { nome, senha } = req.body;

    if (!senha) return res.status(400).json({ message: 'Senha é obrigatória' });

    const passwordHash = hashPassword(senha);

    const resposta = createData(nome, passwordHash);
    
    if(resposta != null){
        res.status(201).json({ id: resposta.id, nome: resposta.nome });
    }else{
        res.status(401).json({ message: 'Erro ao salvar dados' });
    }
};

export const logar = (req, res) => {
    const {nome, senha} = req.body;

    if (!nome) return res.status(400).json({ message: 'Nome é obrigatório' });
    if (!senha) return res.status(400).json({ message: 'Senha é obrigatória' });

    const user = getDadoByNome(nome);

    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    if(comparePassword(senha, user.senha)){
        const token = generateToken(user);
        res.json({token});
    }else{
        return res.status(401).json({ message: 'Senha incorreta' });
    }
};