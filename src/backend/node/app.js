import express from 'express';
import {  pegarJogosDoUsuario, cadastrarJogoUsuario, removerJogoUsuario, login, cadastro } from './bd.js';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const SECRET = 'endeavor';


const exp = express();
exp.set('view engine', 'ejs');

exp.use(express.json());
exp.use(CookieParser());
app.set('trust proxy', 1);

exp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
exp.use(cors());


function verificarJWT(req, res, next){
    const { token }= req.headers;
    jwt.verify(token, SECRET, (erro, decoded) => {
        if(erro) return res.status(401).end();
        req.body.id_usuario = decoded.id_usuario;
        next();
    })
}

exp.post('/', verificarJWT, (requisitar, resposta) => {
    pegarJogosDoUsuario( requisitar.body, resposta);
})
exp.post('/login', (requisitar, resposta) => {
    login(requisitar.body, resposta, (id) => {
        const token = jwt.sign({id_usuario: id}, SECRET, {expiresIn: 3000});
        resposta.cookie('token', token);
        resposta.send(token)
    });
})
exp.post('/cadastro', (requisitar, resposta) => {
    cadastro(requisitar.body, resposta);
})
exp.post('/cadastroJogosUsuario', verificarJWT, (requisitar, resposta) => {
    cadastrarJogoUsuario(requisitar.body);
})
exp.post('/removerJogoUsuario', verificarJWT, (requisitar, resposta) => {
    removerJogoUsuario(requisitar.body);
})

let porta = process.env.PORT;

exp.listen(porta);