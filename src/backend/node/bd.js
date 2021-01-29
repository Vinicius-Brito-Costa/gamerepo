import mysql from 'mysql2';
function conexao(msg = 'seila') {
    const bd = 'gameflix';
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: bd
    });
    con.connect((erro) => {
        if (erro) {
            console.log('A conexão com o banco de dados falhou! ' + erro);
        }
        else {
            if(msg === 'Finalizar a conexão.'){
                console.log('Conexão com banco de dados "' + bd + '" finalizada');
            }
            else{
                console.log('Conexão com banco de dados "' + bd + '" realizada com sucesso. Para ' + msg);
            }
            
        }
    });
    return con;
}
export function pegarJogosDoUsuario( post, resposta) {
    conexao('Pegar jogos do usuario.').query("SELECT * FROM  lista_de_jogos WHERE id_usuario = ?;", [post.id_usuario], (erro, resultado) => {
        resposta.end(JSON.stringify(resultado));
        conexao('Finalizar a conexão.').end();
    });
}
function quantidadeJogosIguais(post){
    let id_jogo     = post.id_jogo;
    let id_usuario  = post.id_usuario;
    let jogosIguais = 0;
    
    return jogosIguais;
}
export function cadastrarJogoUsuario(post) {
    let finalizarConexao = false;
    let id_usuario = post.id_usuario; //parseInt(post.id_usuario);
    let id_jogo = post.id_jogo; //parseInt(post.id_jogo);
    let sqlJogosIguais = "SELECT * FROM lista_de_jogos WHERE id_usuario = ? AND id_jogo = ?;";
    conexao('Checar se jogo já está cadastrado.').query(sqlJogosIguais, [id_usuario, id_jogo], (erro, resultado) => {
        let jogosIguais = resultado.length;
        let sql = "INSERT INTO lista_de_jogos (id_usuario, id_jogo) VALUES (?, ?);";
        console.log(jogosIguais);
        if(jogosIguais == 0){
            conexao('Cadastrar jogo do usuario.').query(sql, [id_usuario, id_jogo], (erro, resultado) => {
                if (erro) {
                    console.log('A query falhou. ' + erro);
                }
                finalizarConexao = true;
            });
        }
    });
    if(finalizarConexao){
        conexao('Finalizar a conexão.').end()
    }
    
    
}
