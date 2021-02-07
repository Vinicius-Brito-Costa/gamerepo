import mysql from 'mysql2';

export function conexao(msg = '') {
    const bd = process.env.BD || 'heroku_ba01ff1f594b282';
    const con = mysql.createConnection({
        host: process.env.HOST || 'us-cdbr-east-03.cleardb.com',
        user: process.env.USER || 'beb6a8632b1042',
        password: process.env.PASSWORD || '16a70633',
        database: bd
    });
    con.connect((erro) => {
        if (erro) {
            console.log('A conexão com o banco de dados falhou! ' + erro);
        } 
        else {
            if (msg === 'Finalizar a conexão.') {
                console.log('Conexão com banco de dados "' + bd + '" finalizada');
            } else {
                console.log('Conexão com banco de dados "' + bd + '" realizada com sucesso. Para ' + msg);
            }
        }
    });
    return con;
}
export function pegarJogosDoUsuario(post, resposta) {
    conexao('Pegar jogos do usuario.').query("SELECT * FROM  lista_de_jogos WHERE id_usuario = ?;", [post.id_usuario], (erro, resultado) => {
        resposta.send(JSON.stringify(resultado));
    });
}
export function cadastrarJogoUsuario(post) {
    let id_usuario = post.id_usuario;
    let id_jogo = post.id_jogo;
    let sqlJogosIguais = "SELECT * FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ?;";
    conexao('Checar se jogo já está cadastrado.').query(sqlJogosIguais, [id_usuario, id_jogo], (erro, resultado) => {
        let jogosIguais = resultado ? (resultado.length == 0 ? true : false) : false ;
        if (erro) {
            console.log(erro)
        }
        let sql = "INSERT INTO lista_de_jogos (id_usuario, id_jogo) VALUES (?, ?);";
        console.log(jogosIguais);
        if (jogosIguais) {
            conexao('Cadastrar jogo do usuario.').query(sql, [id_usuario, id_jogo], (erro) => {
                if (erro) {
                    console.log('A query falhou. ' + erro);
                }
            });
        }
    });
}
export function removerJogoUsuario(post) {
    let id_usuario = post.id_usuario;
    let id_jogo = post.id_jogo;
    let sqlJogo = "DELETE FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ?;";
    conexao('Remover jogo da lista de favoritos.').query(sqlJogo, [id_usuario, id_jogo], (erro, resultado) => {
        if (erro) {
            console.log('A remoção do jogo falhou.');
        }
    })
}