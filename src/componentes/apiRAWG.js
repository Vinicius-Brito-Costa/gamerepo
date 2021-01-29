
export async function pegarJogos(jogos){
    let json = [];
    for(var i = 0; i < jogos.length; i++){
        
        let resultado = await fetch(`https://api.rawg.io/api/games/${jogos[i]['id_jogo']}`);
        let resultadoJson = await resultado.json();
        console.log( "ID: " + jogos[i]['id_jogo'] +  "\n    Nome: " +resultadoJson.name)
        json.push(resultadoJson);
    }
    return json;
}
export async function cadastrarJogo(id_usuario, id_jogo){
    const url = `http://localhost:777/cadastroJogosUsuario`;
    let json = {};
    json.id_usuario = id_usuario; //arrumar forma de pegar o id da conta
    json.id_jogo = id_jogo;
    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, cabecalho).then(window.location.href = "/");
}
export async function procurarJogo(pesquisa, estado, numeroPaginas = 1){
    let pages = 1;
    let continuar = true;
    let jogos = []
    while(continuar){
        const url = `https://api.rawg.io/api/games?page=${pages}&search=${pesquisa}&search_precise=true`;
        await fetch(url)
        .then((resultado) => {
            let json = resultado.json();
            return json
        })
        .then((json) => {
            for(let i = 0; i< json.results.length; i++){
                jogos.push(json.results[i]);
            }
            if(json.next != null && pages <= numeroPaginas){
                pages += 1;
            }
            else{
                continuar = false;
            }
        })

    }
    estado.setState({jogosEncontrados: jogos});
}
export async function selecionarJogo(jogo, estado){
    if(document.getElementById("cabecalho-barra-pesquisa")){
        document.getElementById("cabecalho-barra-pesquisa").value = jogo.name;
    }
    estado.setState({ previewNome: jogo.name});
    estado.setState({ previewId: jogo.id});
    let url = `https://api.rawg.io/api/games/${jogo.id}`;
    fetch(url).then((resposta) => { 
        let json = resposta.json();
        return json;
    }).then(() => {
        if(estado.state.previewId !== 0){
            document.getElementById("cabecalho-submit").style.display = 'block';
        }
    })
    estado.setState({ jogosEncontrados: []});
}