async function fetchGame(id) {
    let resultado = await fetch(`https://api.rawg.io/api/games/${id}`);
    let resultadoJson = await resultado.json();
    return resultadoJson;
}
export async function pegarDev(id) {
    let resultado = await fetch(`https://api.rawg.io/api/creators/${id}`);
    let resultadoJson = await resultado.json();
    return resultadoJson;
}

export async function pegarJogosEstado(jogos, estado) {
    let json = [];
    for (var i = 0; i < jogos.length; i++) {
        let resultadoJson = await fetchGame(jogos[i]['id_jogo']);
        json.push(resultadoJson);
        if (i === 0) {
            estado.bannerPrincipal(json[0]);
        }
        if (i % 3 === 0 && i !== 0) {
            estado.props.AtualizarListaJogos(json);
            estado.setState({
                jogos: json,
                isLoading: false
            })
        }
        if (!estado._estaMontado) {
            estado.setState({
                jogos: json,
                isLoading: false
            })
            break;
        }
    }
    estado.setState({
        jogos: json,
        isLoading: false
    })
    estado.props.AtualizarListaJogos(json);
}
export async function pegarJogos(jogos, estado) {
    let json = [];
    for (var i = 0; i < jogos.length; i++) {
        let resultado = await fetch(`https://api.rawg.io/api/games/${jogos[i]['id_jogo']}`);
        let resultadoJson = await resultado.json();
        // console.log("ID: " + jogos[i]['id_jogo'] + "\n    Nome: " + resultadoJson.name)
        json.push(resultadoJson);
        if (i % 3 === 0 && i !== 0) {
            estado.setState({
                jogos: json
            })
        }
    }
    return json
}
export async function cadastrarJogo(estado, id_usuario, id_jogo) {
    const url = `https://rest-api-gameflix.herokuapp.com/cadastroJogosUsuario`;
    let json = {
        id_usuario: id_usuario,
        id_jogo: id_jogo
    };

    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    estado.setState({
        favorito: !estado.state.favorito
    })
    estado.props.Load()
    await fetch(url, cabecalho);

    return true;
}
export async function procurarJogo(pesquisa, estado, numeroPaginas = 1) {
    let pages = 1;
    let continuar = true;
    let jogos = []
    const url = `https://api.rawg.io/api/games?page=${pages}&search=${pesquisa}&search_precise=true&exclude_additions=true`;
    while (continuar) {
        await fetch(url)
            .then((resultado) => {
                let json = resultado.json();
                return json
            })
            .then((json) => {
                for (let i = 0; i < json.results.length; i++) {
                    jogos.push(json.results[i]);
                }
                if (json.next !== null && pages <= numeroPaginas) {
                    pages += 1;
                } else {
                    continuar = false;
                }
            })

    }

    estado.setState({
        jogosEncontrados: jogos
    });
}
export async function pegarParametro(id_jogo, parametro) {
    let resultado = await fetch(`https://api.rawg.io/api/games/${id_jogo}`)
    let json = await resultado.json();
    return json[parametro]
}

export async function selecionarJogo(jogo, estado) {
    if (document.getElementById("cabecalho-barra-pesquisa")) {
        document.getElementById("cabecalho-barra-pesquisa").value = jogo.name;
    }
    estado.setState({
        previewNome: jogo.name
    });
    estado.setState({
        previewId: jogo.id
    });
    let url = `https://api.rawg.io/api/games/${jogo.id}`;
    fetch(url).then((resposta) => {
        let json = resposta.json();
        return json;
    }).then(() => {
        if (estado.state.previewId !== 0) {
            document.getElementById("cabecalho-submit").style.display = 'block';
        }
    })
    //estado.setState({ jogosEncontrados: []});
}

export async function jogoLojas(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/stores`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let lojas = [];
    for (let i = 0; i < json.results.length; i++) {
        lojas.push(json.results[i]);
    }
    return lojas;
}
export async function jogoTrailers(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/movies`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let trailers = [];
    for (let i = 0; i < json.results.length; i++) {
        trailers.push(json.results[i]);
    }
    return trailers;
}
export async function jogosSugeridos(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/suggested`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let jogos = [];
    for (let i = 0; i < json.results.length; i++) {
        jogos.push(json.results[i]);
    }
    return jogos;
}
export async function jogosMesmaSerie(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/game-series`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let jogos = [];
    for (let i = 0; i < json.results.length; i++) {
        jogos.push(json.results[i]);
    }
    return jogos;
}
export async function screenshotsJogo(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/screenshots`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let screenshots = [];
    for (let i = 0; i < json.results.length; i++) {
        screenshots.push(json.results[i].image);
    }
    return screenshots;
}
export async function desenvolvedoresJogo(id_jogo) {
    let url = `https://api.rawg.io/api/games/${id_jogo}/development-team`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let desenvolvedores = [];
    for (let i = 0; i < json.results.length; i++) {
        desenvolvedores.push(json.results[i]);
    }
    return desenvolvedores;
}
export async function jogosDesenvolvedor(id_dev) {
    let url = `https://api.rawg.io/api/games/${id_dev}/development-team`;
    let resultado = await fetch(url);
    let json = await resultado.json();
    let desenvolvedores = [];
    for (let i = 0; i < json.results.length; i++) {
        desenvolvedores.push(json.results[i]);
    }
    return desenvolvedores;
}
export async function jogosAclamados(numeroJogos, estado) {
    let pages = 1;
    let continuar = true;
    let jogos = [];
    while (continuar) {
        const url = `https://api.rawg.io/api/games?ordering=-metacritic&page=${pages}`;
        await fetch(url)
            .then((resultado) => {
                let json = resultado.json();
                return json
            })
            .then(async (json) => {
                for (let i = 0; i < json.results.length; i++) {
                    if (json.results[i].background_image !== null) {
                        jogos.push(json.results[i]);

                        if (jogos.length === 1) {
                            let jogo = jogos[0];
                            jogo.description = await pegarParametro(json.results[i].id, 'description')
                            estado.bannerPrincipal(jogo)
                        }
                        if (i % 3 === 0 && i !== 0) {
                            estado.setState({
                                jogosAclamados: jogos,
                                isLoading: false
                            })
                        }
                        if (!estado._estaMontado) {
                            estado.setState({
                                jogosAclamados: jogos,
                                isLoading: false
                            })
                            break;
                        }
                        if (jogos.length >= numeroJogos) {
                            break;
                        }
                    }
                }
                if (json.next !== null && jogos.length < numeroJogos) {
                    pages += 1;
                } else {
                    continuar = false;
                }
            })

    }
    let listaRandomica = jogos.sort(() => Math.random() - 0.5)
    estado.setState({
        jogosAclamados: listaRandomica,
        isLoading: false
    })
    //return jogos;
}
export async function jogosLancamento(numeroJogos, estado) {
    let d = new Date()
    let ano = d.getFullYear()
    let mes = d.getMonth()
    let dia = d.getDate()
    if(mes < 10) mes = '0' + mes.toString();
    if(dia < 10) dia = '0' + dia.toString();
    let hoje = ano + '-' + mes + '-' + dia
    if (parseInt(mes) === 1) {
        ano--;
        mes = 11
    } else if (mes === 2) {
        ano--;
        mes = 12
    } else {
        mes -= 2
    }
    if(mes < 10) mes = '0' + mes.toString();
    if(dia < 10) dia = '0' + dia.toString();
    let desde = ano + '-' + mes + '-' + dia
    let pages = 1;
    let continuar = true;
    let jogos = [];
    while (continuar) {
        const url = `https://api.rawg.io/api/games?dates=${desde},${hoje}&ordering=-added&page=${pages}`;
    
        await fetch(url)
            .then((resultado) => {
                let json = resultado.json();
                return json
            })
            .then(async (json) => {
                for (let i = 0; i < json.results.length; i++) {
                    if (json.results[i].background_image !== null) {
                        jogos.push(json.results[i]);
                        if (i % 3 === 0 && i !== 0) {
                            let listaRandomica = jogos.sort(() => Math.random() - 0.5)
                            estado.setState({
                                jogosLancamento: listaRandomica
                            })
                        }
                        if (!estado._estaMontado) {
                            let listaRandomica = jogos.sort(() => Math.random() - 0.5)
                            estado.setState({
                                jogosLancamento: listaRandomica
                            })
                            break;
                        }
                        if (jogos.length >= numeroJogos) {
                            break;
                        }
                    }
                }
                if (json.next !== null && jogos.length < numeroJogos) {
                    pages += 1;
                } else {
                    continuar = false;
                }
            })

    }
    let listaRandomica = jogos.sort(() => Math.random() - 0.5)
    estado.setState({
        jogosLancamento: listaRandomica
    })
    //return jogos;
}

export async function futurosLancamentos(numeroJogos, estado) {
    let d = new Date()
    let ano = d.getFullYear()
    let mes = d.getMonth()
    let dia = d.getDate()
    if(mes < 10) mes = '0' + mes.toString();
    if(dia < 10) dia = '0' + dia.toString();
    let hoje = ano + '-' + mes + '-' + dia
    let ate = (ano + 1) + '-' + mes + '-' + dia
    let pages = 1;
    let continuar = true;
    let jogos = [];
    while (continuar) {
        const url = `https://api.rawg.io/api/games?dates=${hoje},${ate}&ordering=-added&page=${pages}`;
        await fetch(url)
            .then((resultado) => {
                let json = resultado.json();
                return json
            })
            .then(async (json) => {
                for (let i = 0; i < json.results.length; i++) {
                    if (json.results[i].background_image !== null) {
                        jogos.push(json.results[i]);

                        if (jogos.length === 1) {
                            let jogo = jogos[0];
                            jogo.description = await pegarParametro(json.results[i].id, 'description')
                            estado.bannerPrincipal(jogo)
                        }
                        if (i % 3 === 0 && i !== 0) {
                            let listaRandomica = jogos.sort(() => Math.random() - 0.5)
                            estado.setState({
                                futurosLancamentos: listaRandomica
                            })
                        }
                        if (!estado._estaMontado) {
                            let listaRandomica = jogos.sort(() => Math.random() - 0.5)
                            estado.setState({
                                futurosLancamentos: listaRandomica
                            })
                            break;
                        }
                        if (jogos.length >= numeroJogos) {
                            break;
                        }
                    }
                }
                if (json.next !== null && jogos.length < numeroJogos) {
                    pages += 1;
                } else {
                    continuar = false;
                }
            })

    }
    let listaRandomica = jogos.sort(() => Math.random() - 0.5)
    estado.setState({
        futurosLancamentos: listaRandomica
    })
}