import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
const SECRET = 'endeavor';
let log = console.log;


function verificarJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (erro, decoded) => {
        if(erro) return res.status(401).end();

        req.id_usuario = decoded.id_usuario;
        next();
    })
}
export function conexao(msg = '') {
    const bd = process.env.BD;
    const con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: bd
    });

    con.connect((erro) => {
        if (erro) {
            log('A conexão com o banco de dados falhou! ' + erro);
        } else {
            if (msg === 'Finalizar a conexão.') {
                log('Conexão com banco de dados "' + bd + '" finalizada');
            } else if (!msg === '') {
                log('Conexão com banco de dados "' + bd + '" realizada com sucesso. Para ' + msg);
            }
        }
    });
    return con;

}
const checagemEmail = (email) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM cadastro WHERE email = ?;';
        conexao().query(sql, [email], (erro, resultado) => {
            if (erro) {
                log('Erro ao verificar os email.' + erro);
                reject('ixi')
            } else if (resultado.length > 0) {
                log(`Cadastro não realizado. ${email} já existe.`)
                resolve(false);
            }
            resolve(true);
        })
    })
}
const checagemUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        let sql2 = 'SELECT * FROM cadastro WHERE usuario = ?;';
        conexao().query(sql2, [usuario], (erro, resultado) => {
            if (erro) {
                log('Erro ao verificar o usuario.' + erro);
                reject('ixi')
            } else if (resultado.length > 0) {
                log(`${usuario} existe...`)
                resolve(false);
            } else {
                resolve(true);
            }
        })

    })
}

export async function login(post, resposta, funcao = () => {}) {
    checagemUsuario(post.usuario)
        .then((resultadoUsuario) => {
            let usuarioExiste = !resultadoUsuario;
            if (usuarioExiste) {
                let sql = `SELECT * FROM cadastro WHERE usuario = ? AND senha = ?;`;
                conexao('Checar usuario existente.').query(sql, [post.usuario, post.senha], (erro, resultado) => {
                    if (erro) {
                        log('Erro ao checar usuario existente.' + erro);
                    }
                    if (resultado.length > 0) {
                        log('Senha correta...')
                        log(`${post.usuario} logado com sucesso.`)
                        funcao(resultado[0].id_conta);
                    } 
                    else {
                        log('Senha invalida...')
                        resposta.send({
                            usuario: true,
                            senha: false
                        })
                    }
                });
            }
            else{
                log(`${post.usuario} não existe.`)
                resposta.send({
                    usuario: false,
                    senha: false
                })
            }
        })

}
export function cadastro(post, resposta) {
    let sql = `INSERT INTO cadastro (usuario, senha, email) VALUES (?, ?, ?)`;
    checagemEmail(post.email)
        .then((resultadoEmail) => {
            checagemUsuario(post.usuario)
                .then((resultadoUsuario) => {
                    return {
                        email: resultadoEmail,
                        usuario: resultadoUsuario
                    };
                })
                .then((result) => {
                    if (!result.usuario || !result.email) {
                        resposta.send({usuario: result.usuario, email: result.email});
                    } 
                    else {
                        conexao('Cadastrando usuario.').query(sql, [post.usuario, post.senha, post.email], (erro, resultado) => {
                            if (erro) {
                                log('Erro ao cadastrar usuario.' + erro);
                            }
                            resposta.send(result)
                        })
                    }
                })
        })
}

export function pegarJogosDoUsuario(post, resposta) {
    conexao('Pegar jogos do usuario.').query("SELECT (id_jogo) FROM  lista_de_jogos WHERE id_usuario = ?;", [post.id_usuario], (erro, resultado) => {
        resposta.send(JSON.stringify(resultado));
    });
}
export function cadastrarJogoUsuario(post) {
    let id_usuario = post.id_usuario;
    let id_jogo = post.id_jogo;
    let sqlJogosIguais = "SELECT * FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ?;";
    conexao('Checar se jogo já está cadastrado.').query(sqlJogosIguais, [id_usuario, id_jogo], (erro, resultado) => {
        let jogosIguais = resultado ? (resultado.length == 0 ? true : false) : false;
        if (erro) {
            log(erro)
        }
        let sql = "INSERT INTO lista_de_jogos (id_usuario, id_jogo) VALUES (?, ?);";
        log(jogosIguais);
        if (jogosIguais) {
            conexao('Cadastrar jogo do usuario.').query(sql, [id_usuario, id_jogo], (erro) => {
                if (erro) {
                    log('A query falhou. ' + erro);
                }
            });
        }
    });
}
export function removerJogoUsuario(post) {
    let id_usuario = post.id_usuario;
    let jogo = post.id_jogo;
    let sqlJogo = "DELETE FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ?";
    conexao('Remover jogo da lista de favoritos.').query(sqlJogo, [id_usuario, jogo], (erro, resultado) => {
        if (erro) {
            log('A remoção do jogo falhou.');
        }
    })
}
export function removerJogosUsuario(post) {
    let id_usuario = post.id_usuario;
    let jogos = post.jogos;
    log(post)
    let sqlJogo = "DELETE FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ? ";
    for (let i = 1; i < jogos.length; i++) {
        sqlJogo += 'OR id_jogo = ? '
    }
    log(sqlJogo);
    log(...jogos)
    conexao('Remover jogo da lista de favoritos.').query(sqlJogo, [id_usuario, ...jogos], (erro, resultado) => {
        if (erro) {
            log('A remoção do jogo falhou.');
        }
    })
}