import express from 'express';
import {  pegarJogosDoUsuario, cadastrarJogoUsuario, removerJogoUsuario, login, cadastro } from './bd.js';
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
    pegarJogosDoUsuario( requisitar.body, resposta);
})
exp.post('/login', (requisitar, resposta) => {
    login(requisitar.body, resposta);
})
exp.post('/cadastro', (requisitar, resposta) => {
    cadastro(requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', (requisitar, resposta) => {
    cadastrarJogoUsuario( requisitar.body);
})
exp.post('/removerJogoUsuario', (requisitar, resposta) => {
    removerJogoUsuario( requisitar.body);
})

let porta = process.env.PORT || 777;

exp.listen(porta);