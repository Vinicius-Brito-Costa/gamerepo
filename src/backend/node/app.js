import express from 'express';
import { conexao, pegarJogosDoUsuario, cadastrarJogoUsuario, removerJogoUsuario } from './bd.js';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const exp = express();
exp.use(morgan('dev'))

exp.set('view engine', 'ejs');

exp.use(urlencoded({ extended: false }))
exp.use(json());
exp.use(cors());
exp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

exp.post('/', async (requisitar, resposta, next) => {
    console.log('entrou pegar jogos')
    await pegarJogosDoUsuario(conexao, requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', async (requisitar, resposta, next) => {
    console.log('entrou cadastro')
    await cadastrarJogoUsuario(conexao, requisitar.body);
})
exp.post('/removerJogoUsuario', async (requisitar, resposta, next) => {
    console.log('entrou remover jogos')
    await removerJogoUsuario(conexao, requisitar.body);
})
exp.use((req, res, next) => {
    const erro = new Error('Não encontrado.');
    erro.status(404);
    next(erro)
})
exp.use((erro, req, res, next) => {
    res.status(erro.status || 500);
    res.json({
        error: {
            mensagem: erro.message
        }
    })
})
let porta = 777;

exp.listen(porta);