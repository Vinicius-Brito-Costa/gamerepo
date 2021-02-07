import React from 'react';
import { pegarParametro, desenvolvedoresJogo } from './../componentes/apiRAWG';
import BannerPrincipal from './../componentes/banner_jogo_principal';
import dompurify from 'dompurify';
import { connect } from 'react-redux';
import { scrollToTop } from './../javascript/funcoes';
import ListaDevs from './../componentes/lista_devs';

const estados = (states) => {
    return{
        _jogoSelecionado: states.jogoSelecionado
    }
}
class PaginaJogo extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            jogoSelecionado: [],
            devs: []
        }
    }
    async componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            scrollToTop();
            let jogo = this.props._jogoSelecionado;
            jogo['description'] = await pegarParametro(jogo.id, 'description')
            this.setState({jogoSelecionado: jogo})
            let devs = await desenvolvedoresJogo(jogo.id);
            this.setState({devs: devs});

        }
    }
    async componentDidUpdate(prevProps){
        if(this.props._jogoSelecionado != prevProps._jogoSelecionado){
            let jogo = this.props._jogoSelecionado;
            jogo['description'] = await pegarParametro(jogo.id, 'description')
            this.setState({jogoSelecionado: jogo})
            let devs = await desenvolvedoresJogo(jogo.id);
            this.setState({devs: devs});
        }
    }
    render(){
        const sanitizador = dompurify.sanitize;
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-jogos">
                <BannerPrincipal jogo={this.props._jogoSelecionado}></BannerPrincipal>
                <div className='pagina-jogo-conteudo'>
                    <div className='pagina-jogo-main-text'>
                        <h2>Descrição: </h2>
                        <div dangerouslySetInnerHTML={{__html: sanitizador(this.props._jogoSelecionado.description)}}></div>
                    </div>
                    <ListaDevs devs={this.state.devs} />
                </div>
            </main>
        );
    }
}
export default connect(estados)(PaginaJogo);