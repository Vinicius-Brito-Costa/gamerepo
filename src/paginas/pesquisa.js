import React from 'react';
import ListaJogos from './../componentes/lista_jogos';
import { procurarJogo } from './../componentes/apiRAWG';
import { connect } from 'react-redux';
import { scrollToTop } from './../javascript/funcoes';
import Loading from './../componentes/placeholder/loading';

const estados = (state) => {
    return {
        pesquisa: state.pesquisa,
        id_usuario: state.id_usuario
    }
}

class PaginaPesquisa extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            load: 1,
            itensPorPagina: 20,
            paginaAtual: 0,
            jogosEncontrados: [],
            jogosRenderizados: []
        }
        this.criarPaginas = this.criarPaginas.bind(this);
        this.selecionarPagina = this.selecionarPagina.bind(this);
    }
    componentDidMount(){
        this.criarPaginas()
    }
    componentDidUpdate(prevProps){
        this._estaMontado = true;
        if((this.props.pesquisa !== prevProps.pesquisa) && this._estaMontado){
            this.criarPaginas()
        }
    }
    async criarPaginas(){
        this.setState({jogosRenderizados: []})
        await procurarJogo(this.props.pesquisa, this, 9);
        let itensPagina = this.state.itensPorPagina;
        let jogos = this.state.jogosEncontrados;
        let numeroDeJogos = jogos.length;
        let paginas = [];
        for(let i = 0; i < numeroDeJogos; i += itensPagina ){
            paginas.push(jogos.slice(i, (i + itensPagina)));
            
        }
        this.setState({jogosRenderizados: paginas});
    }
    selecionarPagina(pagina){
        scrollToTop();
        this.setState({paginaAtual: pagina})
    }
    render(){
        return this.state.jogosRenderizados.length > 0 ? (
            <main className="main-body-loading px-0 text-light mx-auto">
                <ListaJogos jogos={this.state.jogosRenderizados[this.state.paginaAtual]} index={this.state.paginaAtual}/>
                <div className="pesquisa-selecao-paginas text-center">
                    <div className='d-block'>
                        {this.state.jogosRenderizados.map((conteudo, index) => 
                            <button className="btn border-secondary text-light mx-1" key={index} onClick={() => this.selecionarPagina(index)} >{index + 1}</button>
                        )}
                    </div>
                </div>
            </main>
        ): (<Loading/>);
    }
}
export default connect(estados)(PaginaPesquisa);