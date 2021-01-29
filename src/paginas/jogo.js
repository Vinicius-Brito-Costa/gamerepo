import React from 'react';
import { cadastroJogoUsuario } from './../componentes/apiRAWG'
import dompurify from 'dompurify';

export default class PaginaInical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            att: 0,
            jogosEncontrados: [],
            isLoading: false,
            previewId: 0,
            previewImagem: '',
            previewNome: '',
            previewDescricao: '',
            previewGeneros: []
        }
        //this.cadastro = this.cadastro.bind(this);
        this.procurarJogo = this.procurarJogo.bind(this);
        this.selecionarJogo = this.selecionarJogo.bind(this);
        this.cadastrarJogo = this.cadastrarJogo.bind(this);
    }

    
    procurarJogo(elemento){
        elemento.preventDefault();
        const url = `https://api.rawg.io/api/games?search=${elemento.target.value}&search_precise=true`;
        if(!this.state.isLoading){
            this.setState({isLoading: true})
            fetch(url)
            .then((resultado) => {
                let json = resultado.json();
                return json
            })
            .then((json) => {
                let jogos = []
                for(let i = 0; i< json.count; i++){
                    jogos.push(json.results[i]);
                }
                return jogos;
            })
            .then((jogos) => {
                if(elemento.target.value === ''){
                    this.setState({jogosEncontrados: []});
                }
                else{
                    this.setState({jogosEncontrados: jogos});
                }
                
            })
            this.setState({isLoading: false})

        }
        
    }
    selecionarJogo(jogo){
        if(document.getElementById("cadastro-barra-pesquisa")){
            document.getElementById("cadastro-barra-pesquisa").value = jogo.name;
        }
        this.setState({ previewImg: jogo.background_image});
        this.setState({ previewNome: jogo.name});
        this.setState({ previewId: jogo.id});
        console.log(jogo.id)
        let url = `https://api.rawg.io/api/games/${jogo.id}`;
        fetch(url).then((resposta) => { 
            let json = resposta.json();
            return json;
        }).then((resposta) => {
            this.setState({ previewDescricao: resposta.description});
        }).then(() => {
            if(this.state.previewId !== 0){
                document.getElementById("cadastro-submit").style.display = 'block';
            }
        })
        
        
        this.setState({ previewGeneros: jogo.genres });
        this.setState({jogosEncontrados: []})
        
    }
    cadastrarJogo(){
        const url = `http://localhost:777/cadastroJogosUsuario`;
        let json = {};
        json.id_usuario = 1; //arrumar forma de pegar o id da conta
        json.id_jogo = this.state.previewId;
        console.log(json);
        console.log(this.state.previewId)
        let cabecalho = {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, cabecalho).then(window.location.href = "/");
    }
    render(){
        const sanitizador = dompurify.sanitize;
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-jogos">
                
            </main>
        );
    }
}