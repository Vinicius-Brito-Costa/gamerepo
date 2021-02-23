import React, { lazy, Suspense } from 'react';
import { pegarJogosEstado,  } from '../componentes/apiRAWG';
import { connect } from 'react-redux';
import { AtualizarListaJogos, ResetRemoverJogos, ResetAdicionarJogos } from '../actions/usuario'
import { Loaded, Load } from '../actions/paginaPrincipal'
import Loading from '../componentes/placeholder/loading';
import SemJogo from '../componentes/placeholder/usuarioSemJogo';
import Cabecalho from '../componentes/cabecalhoBase';

const BannerPrincipal = lazy(() => import('../componentes/banner_principal'));
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
        jogosRemovidos: state.jogosRemovidos,
        jogosAdicionados: state.jogosAdicionados,
        reload: state.frontReload
    }
}

class MinhaLista extends React.Component{
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
        let func = (async () => {
            let recarregado = this.props.reload;
            console.log(recarregado)
            this.props.Loaded();
            let resultado = await fetch('http://localhost:777', Cabecalho())
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

    render(){

        return (this.state.isLoading ? <Loading/> :
            this.state.jogos.length === 0 ? 
            <div><SemJogo />{console.log(this.state.jogos)}</div>
            : 
            <main className="container-fluid px-0 text-light">
                <Suspense fallback={<p>Carregando</p>}>
                    <BannerPrincipal jogo={this.state.jogo_banner}/>
                </Suspense>
                <div className="paginas-inicio">
                    <h2 className='paginas-inicio-titulo'>Minha Lista</h2>
                    <Suspense fallback={<p>Carregando</p>}>
                        <main className="lista-de-jogos-main w-100 row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 mx-auto px-0 py-4">
                            {this.state.jogos.map((jogo, chave)=>
                                <div className="box-game-card my-1" style={{height: '120px'}} onClick={() => this.bannerPrincipal(jogo)} key={chave}><Suspense fallback={<p>Carregando</p>}><CardJogo jogo={jogo} index={chave} id_usuario={this.props.id_usuario} paginaUsuario={true} /></Suspense></div>
                            )}
                        </main>
                    </Suspense>
                </div>

            </main>
        );
    }
}
export default connect(estados, mapDispatchToProps())(MinhaLista);