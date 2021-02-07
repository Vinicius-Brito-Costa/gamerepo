import React from 'react';
import { cadastrarJogo } from './../componentes/apiRAWG'
import dompurify from 'dompurify';
import { connect } from 'react-redux';

const estados = (state) => {
    return {
        id_usuario: state.id_usuario
    }
}

class PaginaCadastro extends React.Component{
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
    render(){
        const sanitizador = dompurify.sanitize;
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-jogos">
                <div className="input-box mx-auto">
                    <h1 className="text-center">Adicionar Jogos</h1>
                    <div className='cadastro-preview'>
                        <img className="cadastro-preview-img" src={this.state.previewImg} alt=""/>
                        <div className="cadastro-preview-info">
                            <h2>{this.state.previewNome}</h2>
                           <div className="cadastro-preview-generos">
                                {this.state.previewGeneros.map((genero, index) => 
                                    <div className="cadastro-preview-genero" key={index}>{genero.name}</div>
                                )}
                           </div>
                            <div className="cadastro-preview-text" dangerouslySetInnerHTML={{__html: sanitizador(this.state.previewDescricao)}}></div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-pre input-group-text">Jogo</span>
                            </div>
                            <input type="text" id="cadastro-barra-pesquisa" className="input input-texto form-control" onChange={this.procurarJogo} placeholder="Nome do jogo" name='nome' />
                            <input type="hidden" name='id_jogo' />
                        </div>
                        <div className="cadastro-pesquisa-resultado">
                            {this.state.jogosEncontrados.map((valor, index) => {
                                if(valor){
                                    return <button onClick={() => this.selecionarJogo(valor)} className=" btn cadastro-pesquisa-item" key={index} style={{display: 'block'}}>{valor.name} <span className="div-pesquisa-add">+</span></button>
                                }
                                else{ return null }
                            }
                            )}
                        </div>
                        <div className="input-box-adicionar">
                            <button id="cadastro-submit" onClick={() => cadastrarJogo(this.props.id_usuario, this.state.previewId)} className='btn input-btn'>ADICIONAR</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
export default connect(estados)(PaginaCadastro);