import React from 'react';
import { pegarParametro, desenvolvedoresJogo, screenshotsJogo, jogosMesmaSerie, jogosSugeridos } from './../componentes/apiRAWG';
import BannerPrincipal from './../componentes/banner_jogo_principal';
import dompurify from 'dompurify';
import { connect } from 'react-redux';
import { scrollToTop } from './../javascript/funcoes';
import ListaDevs from './../componentes/lista_devs';
import { SelecionarJogo, AdicionarJogos, RemoverJogos } from './../actions/usuario';
import { Load } from './../actions/paginaPrincipal';
import ListaJogos from '../componentes/lista_jogos';
let token = 'none'
if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
    token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
}
else if(document.cookie.split('token=')){
    token = document.cookie.split('token=')[1];
}

const mapDispatchToProps = () => {
    return{
        SelecionarJogo,
        Load,
        AdicionarJogos,
        RemoverJogos
    }
}
const estados = (states) => {
    return{
        id_usuario: states.id_usuario,
        _jogoSelecionado: states.jogoSelecionado,
        jogosDoUsuario: states.listJogosUsuario,
        frontReload: states.frontReload
    }
}
class PaginaJogo extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            jogoSelecionado: [],
            jogosParecidos: [],
            devs: [],
            screenshots: [],
            favorito: false
        }
        this.checarFavorito = this.checarFavorito.bind(this);
        this.adicionarAoUsuario = this.adicionarAoUsuario.bind(this);
        this.removerDoUsuario = this.removerDoUsuario.bind(this);
    }
    async componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            this.checarFavorito();
            scrollToTop();
            let jogo = this.props._jogoSelecionado;
            jogo['description'] = await pegarParametro(jogo.id, 'description')
            this.setState({jogoSelecionado: jogo})
            let sS = await screenshotsJogo(jogo.id);
            this.setState({screenshots: sS})
            let devs = await desenvolvedoresJogo(jogo.id);
            this.setState({devs: devs});
            let mesmaSerie = await jogosMesmaSerie(jogo.id);
            let sugeridos = await jogosSugeridos(jogo.id);
            let sugeridosSemRepetidos = mesmaSerie.concat(sugeridos);
            sugeridosSemRepetidos = [...new Set([...mesmaSerie, ...sugeridos])];
            console.log(sugeridosSemRepetidos)
            this.setState({jogosParecidos: sugeridosSemRepetidos});
        }
    }
    async componentDidUpdate(prevProps){
        if(this.props._jogoSelecionado !== prevProps._jogoSelecionado){
            this.checarFavorito();
            let jogo = this.props._jogoSelecionado;
            jogo['description'] = await pegarParametro(jogo.id, 'description')
            this.setState({jogoSelecionado: jogo})
            let sS = await screenshotsJogo(jogo.id);
            this.setState({screenshots: sS})
            let devs = await desenvolvedoresJogo(jogo.id);
            this.setState({devs: devs});
            let mesmaSerie = await jogosMesmaSerie(jogo.id);
            let sugeridos = await jogosSugeridos(jogo.id);
            let sugeridosSemRepetidos = mesmaSerie.concat(sugeridos);
            sugeridosSemRepetidos = [...new Set([...mesmaSerie, ...sugeridos])];
            console.log(sugeridosSemRepetidos)
            this.setState({jogosParecidos: sugeridosSemRepetidos});
        }
    }
    componentWillUnmount(){
        this._estaMontado = false;
    }
    checarFavorito(){
        let jogos = this.props.jogosDoUsuario;
        for(let i = 0; i < jogos.length; i++){
            if(jogos[i].id === this.props._jogoSelecionado.id){
                this.setState({favorito: true});
                break
            }
            else{
                this.setState({favorito: false});
            }
        }
    }
    async adicionarAoUsuario(){
        let dado = {
            id_jogo: this.props._jogoSelecionado.id
        }
        const cabecalho = {
            method: "POST",
            body: JSON.stringify(dado),
            headers: {
                "token": token,
                'Content-Type': 'application/json'
            }
        };
        let url = 'https://rest-api-gameflix.herokuapp.com/cadastroJogosUsuario';
        console.log('cadastrou')
        setTimeout(() => console.log('intervalo'), 500)
        await fetch(url, cabecalho)
        if(!this.props.frontReload){
            this.props.Load()
        }
        this.setState({favorito: !this.state.favorito})
        window.location.reload()
        window.location.href = '/minhaLista';
    }
    async removerDoUsuario(){
        let dado = {
            id_usuario: this.props.id_usuario,
            id_jogo: this.props._jogoSelecionado.id
        }
        const cabecalho = {
            method: "POST",
            body: JSON.stringify(dado),
            headers: {
                "token": token,
                'Content-Type': 'application/json'
            }
        };
        let url = 'https://rest-api-gameflix.herokuapp.com/removerJogoUsuario';
        console.log('removeu')
        setTimeout(() => console.log('intervalo'), 500)
        fetch(url, cabecalho)
        if(!this.props.frontReload){
            this.props.Load()
        }
        this.setState({favorito: !this.state.favorito})
        window.location.reload()
        window.location.href = '/minhaLista';
    }
    render(){
        const sanitizador = dompurify.sanitize;
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-jogos">
            {this.state.favorito ? 
                <div className='pagina-jogo-remover' onClick={this.removerDoUsuario} ><div><h1>x</h1>REMOVER</div></div>
            : <div className='pagina-jogo-favorito' onClick={this.adicionarAoUsuario} ><div><h1>+</h1>ADICIONAR</div></div>}
                <BannerPrincipal jogo={this.props._jogoSelecionado}></BannerPrincipal>
                
                <div className='pagina-jogo-conteudo'>
                    
                    <div className='pagina-jogo-main-text'>
                        <h2>Descrição: </h2>
                        <div dangerouslySetInnerHTML={{__html: sanitizador(this.props._jogoSelecionado.description)}}></div>
                        
                    </div>
                    <div className="pagina-jogo-main-screenshot">
                        {this.state.screenshots.length > 0 ? <h2>Screenshots: </h2> : ""}
                        <div className='pagina-jogo-main-gallery row row-cols-lg-3 row-cols-md-2 row-cols-1'>
                            {this.state.screenshots.length > 0 ? this.state.screenshots.map((foto, id) => {
                                if(id < 6){
                                    return (
                                        <img src={foto} key={id} alt='' className='c'/>
                                    )
                                }
                                return ''
                            }): ''}
                        </div>
                    </div>
                    <div className="pagina-jogo-main-dev">
                        {this.state.devs.length > 0 ? 
                            <ListaDevs devs={this.state.devs} />
                        : ''}
                    </div>
                    <div className='pagina-jogo-main-sugeridos-titulo'><h2>Jogos sugeridos: </h2></div>
                    <div className='pagina-jogo-main-sugeridos'>
                        <ListaJogos jogos={this.state.jogosParecidos}/>
                    </div>
                    
                </div>
            </main>
        );
    }
}
export default connect(estados, mapDispatchToProps())(PaginaJogo);