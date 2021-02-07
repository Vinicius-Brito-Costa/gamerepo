import express from 'express';
import {  pegarJogosDoUsuario, cadastrarJogoUsuario, removerJogoUsuario } from './bd.js';
import cors from 'cors';
import morgan from 'morgan';

const exp = express();
exp.use(morgan('dev'))

exp.set('view engine', 'ejs');

exp.use(express.json());
exp.use(cors());
exp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

exp.post('/', (requisitar, resposta, next) => {
    console.log('entrou pegar jogos')
    pegarJogosDoUsuario( requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', (requisitar, resposta, next) => {
    console.log('entrou cadastro')
    cadastrarJogoUsuario( requisitar.body);
})
exp.post('/removerJogoUsuario', (requisitar, resposta, next) => {
    console.log('entrou remover jogos')
    removerJogoUsuario( requisitar.body);
})

let porta = process.env.PORT || 3306;

exp.listen(porta);