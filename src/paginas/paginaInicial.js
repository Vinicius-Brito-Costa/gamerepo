import React, { lazy, Suspense } from 'react';
import { consts } from 'react-elastic-carousel';
import { pegarJogosEstado } from './../componentes/apiRAWG';
import { connect } from 'react-redux';
import { AtualizarListaJogos } from './../actions/usuario'
import { Loaded, Load } from './../actions/paginaPrincipal'
import Loading from './../componentes/placeholder/loading';
import SemJogo from './../componentes/placeholder/usuarioSemJogo';


const Carousel = lazy(() => import('react-elastic-carousel'));
const BannerPrincipal = lazy(() => import('./../componentes/banner_principal'));
const CardJogo = lazy(() => import('../componentes/card_jogo'));


const mapDispatchToProps = () =>{
    return {
        AtualizarListaJogos,
        Loaded,
        Load
    }
}
const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario,
        reload: state.frontReload
    }
}

class PaginaInicial extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            jogos: [],
            setas: true,
            jogo_banner: [],
            isLoading: true
        }
        this.bannerPrincipal = this.bannerPrincipal.bind(this);
        this.pegarJogosDoUsuario = this.pegarJogosDoUsuario.bind(this);
        
    }
    componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            this.pegarJogosDoUsuario();
        }
    }
    componentDidUpdate(){
        let reload = this.props.reload
        if(reload){
            reload = false;
            this.pegarJogosDoUsuario();
        }
    }
    componentWillUnmount(){
        this._estaMontado = false;
    }
    pegarJogosDoUsuario(){
        let dado = {
            id_usuario: this.props.id_usuario
        }
        const cabecalho = {
            method: "POST",
            body: JSON.stringify(dado),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(this.props.reload)
        console.log(cabecalho.body);
        let func = (async () => {
            let recarregado = this.props.reload;
            console.log(recarregado)
            this.props.Loaded();
            let resultado = await fetch('https://rest-api-gameflix.herokuapp.com/', cabecalho)
            let json = await resultado.json();
            if(recarregado){
                console.log('Sim')
                await  pegarJogosEstado(json, this);
            }
            else{
                console.log('Nao')
                this.setState({jogos: this.props.listJogosUsuario, isLoading: false})
                this.bannerPrincipal(this.state.jogos[0]);
            }
        })
        func();
    }
    bannerPrincipal(jogo){
        this.setState({
            jogo_banner: jogo
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
            {width: 1200, itemsToShow: 4}
        ]
        return (this.state.isLoading ? <Loading/> :
            this.state.jogos.length == 0 ? 
            <div><SemJogo />{console.log(this.state.jogos)}</div>
            : 
            <main className="container-fluid px-0 text-light">
            <Suspense fallback={<p>Carregando</p>}>
                <BannerPrincipal jogo={this.state.jogo_banner}/>
            </Suspense>
            <div className="paginas-inicio">
                <h2>Minha Lista</h2>
                <Suspense fallback={<p>Carregando</p>}>
                    <Carousel breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} focusOnSelect={true}>

                        {this.state.jogos.map((jogo, chave)=>
                            <div className="" onClick={() => this.bannerPrincipal(jogo)} key={chave}><Suspense fallback={<p>Carregando</p>}><CardJogo jogo={jogo} id_usuario={this.props.id_usuario} paginaUsuario={true} /></Suspense></div>
                        )}
                        
                    </Carousel>
                </Suspense>
            </div>

        </main>
        );
    }
}
export default connect(estados, mapDispatchToProps())(PaginaInicial);