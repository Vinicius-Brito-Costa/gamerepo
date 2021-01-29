import express from 'express';
import { pegarJogosDoUsuario, cadastrarJogoUsuario } from './bd.js';
import { json } from 'body-parser';
import cors from 'cors';
const exp = express();


exp.set('view engine', 'ejs');

exp.use(json());
exp.use(cors());
exp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

let servidor = exp.post('/', (requisitar, resposta) => {
    pegarJogosDoUsuario( requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', (requisitar, resposta) => {
    cadastrarJogoUsuario(requisitar.body);
})

let porta = 777;

servidor.listen(porta);