import fs from 'fs';
import path from 'path';

const filePath = path.resolve('db.json');
const fileTarefa = path.resolve('tarefa.json')

const readData = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const readDataTarefa = () => {
    if(!fs.existsSync(fileTarefa)) return [];
    const data = fs.readFileSync(fileTarefa);
    return JSON.parse(data);
}

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const saveDataTarefa = (data) => {
    fs.writeFileSync(fileTarefa, JSON.stringify(data, null, 2));
}
  
export const getDadoByNome = (nome) => {
    const data = readData();
    const item = data.find(u => u.nome == nome);
  
    return item;
};

export const getData = () => {
    const data = readData();
    return data;
};

export const getDataTarefa = () => {
    const data = readDataTarefa();
    return data;
}

export const createData = (nome, senhaHash) => {
    const data = readData();
  
    if (!senhaHash) return null;
  
    const newDado = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      nome,
      senha: senhaHash
    };
  
    data.push(newDado);
    saveData(data);
    return newDado;
};

export const createTarefa = (titulo, texto) => {
    const data = readDataTarefa();

    const newTarefa = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        titulo,
        texto
    };

    data.push(newTarefa);
    saveDataTarefa(data);
    return newTarefa;
}