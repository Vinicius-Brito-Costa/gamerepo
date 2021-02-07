import express from 'express';
import {  pegarJogosDoUsuario, cadastrarJogoUsuario, removerJogoUsuario } from './bd.js';
import cors from 'cors';

const exp = express();
exp.set('view engine', 'ejs');

exp.use(express.json());


exp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
exp.use(cors());



exp.post('/', (requisitar, resposta) => {
    console.log('entrou pegar jogos')
    pegarJogosDoUsuario( requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', (requisitar, resposta) => {
    console.log('entrou cadastro')
    cadastrarJogoUsuario( requisitar.body);
})
exp.post('/removerJogoUsuario', (requisitar, resposta) => {
    console.log('entrou remover jogos')
    removerJogoUsuario( requisitar.body);
})

let porta = process.env.PORT;

exp.listen(porta);