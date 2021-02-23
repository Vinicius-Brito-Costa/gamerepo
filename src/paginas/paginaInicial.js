import React, { lazy, Suspense } from 'react';
import { consts } from 'react-elastic-carousel';
import { jogosLancamento, futurosLancamentos, jogosAclamados, pegarParametro } from './../componentes/apiRAWG';
import { connect } from 'react-redux';
import { AtualizarListaJogos, ResetRemoverJogos, ResetAdicionarJogos } from './../actions/usuario'
import { Loaded, Load } from './../actions/paginaPrincipal'
import Loading from './../componentes/placeholder/loading';

const Carousel = lazy(() => import('react-elastic-carousel'));
const BannerPrincipal = lazy(() => import('./../componentes/banner_principal'));
const CardJogo = lazy(() => import('../componentes/card_jogo'));


const mapDispatchToProps = () =>{
    return {
        AtualizarListaJogos,
        Loaded,
        Load,
        ResetRemoverJogos,
        ResetAdicionarJogos
    }
}
const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario,
        jogosAdicionados: state.jogosAdicionados,
        jogosRemovidos: state.jogosRemovidos,
        reload: state.frontReload
    }
}

class PaginaInicial extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            jogosAclamados: [],
            jogosLancamento: [],
            futurosLancamentos: [],
            setas: true,
            jogo_banner: [],
            isLoading: true,
        }
        this.bannerPrincipal = this.bannerPrincipal.bind(this);
    }
    componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            jogosAclamados(20, this);
            jogosLancamento(20, this);
            futurosLancamentos(20, this);
        }
    }
    componentDidUpdate(){
        let reload = this.props.reload
        if(reload){
            reload = false;
        }
    }
    componentWillUnmount(){
        this._estaMontado = false;
    }

    async bannerPrincipal(jogo){
        let jogoBanner  = jogo
        jogoBanner.description = await pegarParametro(jogo.id, 'description')
        this.setState({
            jogo_banner: jogoBanner
        })
    }
    setas({ type, onClick, isEdge}){
        let setaEsqOn = require('../imagens/carousel/setaEsqOn.svg').default;
        let setaEsqOff = require('../imagens/carousel/setaEsqOff.svg').default;
        let setaDirOn = require('../imagens/carousel/setaDirOn.svg').default;
        let setaDirOff = require('../imagens/carousel/setaDirOff.svg').default;
        const ponteiro = type === consts.PREV ? (isEdge ? setaEsqOff : setaEsqOn) : (isEdge ? setaDirOff : setaDirOn);
        return (
            <button type="button" onClick={onClick} disabled={isEdge} className="carousel-botao">
                <img src={ponteiro} alt=""/>
            </button>
        )
    }
    render(){
        const breakPoints = [
            {width: 1, itemsToShow: 1},
            {width: 668, itemsToShow: 2},
            {width: 900, itemsToShow: 3},
            {width: 1000, itemsToShow: 4},
            {width: 1400, itemsToShow: 5}
        ]
        return (this.state.isLoading ? <Loading/> :
            <main className="">
                <Suspense fallback={<p>Carregando</p>}>
                    <BannerPrincipal jogo={this.state.jogo_banner}/>
                </Suspense>
                <div className='paginas-inicio'>
                    <h2 className='paginas-inicio-titulo'>Aclamados pela crítica</h2>
                    <Suspense fallback={<p>Carregando</p>}>
                        <Carousel breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} focusOnSelect={true}>

                            {this.state.jogosAclamados.map((jogo, chave)=>
                                <div className="box-game-card" onClick={() => this.bannerPrincipal(jogo)} key={chave}><Suspense fallback={<p>Carregando</p>}><CardJogo jogo={jogo} index={chave} id_usuario={this.props.id_usuario} /></Suspense></div>
                            )}
                            
                        </Carousel>
                    </Suspense>
                </div>
                <div className='paginas-inicio'>
                    <h2 className='paginas-inicio-titulo'>Lançamentos</h2>
                    <Suspense fallback={<p>Carregando</p>}>
                        <Carousel breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} focusOnSelect={true}>

                            {this.state.jogosLancamento.map((jogo, chave)=>
                                <div className="box-game-card" key={chave}><Suspense fallback={<p>Carregando</p>}><CardJogo jogo={jogo} index={chave} id_usuario={this.props.id_usuario} /></Suspense></div>
                            )}
                            
                        </Carousel>
                    </Suspense>
                </div>
                <div className='paginas-inicio'>
                    <h2 className='paginas-inicio-titulo'>Lançamento próximo</h2>
                    <Suspense fallback={<p>Carregando</p>}>
                        <Carousel breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} focusOnSelect={true}>

                            {this.state.futurosLancamentos.map((jogo, chave)=>
                                <div className="box-game-card" key={chave}><Suspense fallback={<p>Carregando</p>}><CardJogo jogo={jogo} index={chave} id_usuario={this.props.id_usuario} /></Suspense></div>
                            )}
                            
                        </Carousel>
                    </Suspense>
                </div>
            </main>
        );
    }
}
export default connect(estados, mapDispatchToProps())(PaginaInicial);