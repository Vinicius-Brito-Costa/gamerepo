import React from 'react';
import { pegarDev, procurarJogo } from '../componentes/apiRAWG';
import BannerPrincipal from '../componentes/banner_dev_principal';
import dompurify from 'dompurify';
import { connect } from 'react-redux';
import { scrollToTop } from '../javascript/funcoes';
import ListaJogos from '../componentes/lista_jogos';

const estados = (states) => {
    return{
        _devSelecionado: states.devSelecionado,
        pesquisa: states.pesquisa
    }
}
class PaginaDev extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            devSelecionado: [],
            jogosEncontrados: []
        }
    }
    async componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            scrollToTop();
            let dev =  await pegarDev(this.props._devSelecionado)
            this.setState({devSelecionado: dev})
            await procurarJogo(this.props.pesquisa, this);
            console.log('Passou')
        }
    }
    async componentDidUpdate(prevProps){
        if(this.props._devSelecionado !== prevProps._devSelecionado){
            scrollToTop();
            let dev =  await pegarDev(this.props._devSelecionado)
            this.setState({devSelecionado: dev})
            await procurarJogo(this.props.pesquisa, this, 4);
            console.log('Passou')
        }
    }
    componentWillUnmount(){
        this._estaMontado = false;
    }
    render(){
        console.log(this.props._devSelecionado)
        const sanitizador = dompurify.sanitize;
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-devs">
                <BannerPrincipal dev={this.state.devSelecionado}></BannerPrincipal>
                <div className='pagina-dev-conteudo'>
                    <div className='pagina-dev-main-text'>
                        <h2>Descrição: </h2>
                        <div dangerouslySetInnerHTML={{__html: sanitizador(this.state.devSelecionado.description)}}></div>
                    </div>
                    <div className="pagina-dev-main-dev">
                        <h2>Participações: </h2>
                        <ListaJogos jogos={this.state.jogosEncontrados} />
                    </div>
                </div>
            </main>
        );
    }
}
export default connect(estados)(PaginaDev);