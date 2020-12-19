import React from 'react';
import Rotas from './rotas';
import { BrowserRouter as Router, Link } from 'react-router-dom';
export default class Componente extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posicaoScroll: window.pageYOffset
        }

    }
    componentDidMount() {
        window.addEventListener('scroll', this.checarScroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.checarScroll)
    }
    checarScroll = () => {
        let cabecalho = document.querySelector("#cabecalho-fundo")
        if(document.documentElement.scrollTop > 1 && cabecalho){
            document.querySelector("#cabecalho-fundo").setAttribute("id", "cabecalho-fundo-2");
        }
        else if(document.documentElement.scrollTop < 1 && !cabecalho){
            document.querySelector("#cabecalho-fundo-2").setAttribute("id", "cabecalho-fundo");
        }
        const scroll = document.body.scrollTop || document.documentElement.scrollTop
        
        const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight
        
        const rolagem = scroll / altura
        
        this.setState({
            posicaoScroll: rolagem,
        })
    }
    render(){
        return(
            <Router>
                <nav className="position-fixed w-100 navbar navbar-expand-lg navbar-dark" id="cabecalho-fundo">
                    <Link className="navbar-brand px-0" as={Link} to='/'><img className="Logo py-2" src={require('../imagens/Netflix-Logo.png').default} alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/'>Início</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/fila'>Fila</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/completos'>Completos</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/bombando'>Bombando</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/lista'>Minha lista</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0" onSubmit="">
                            <input className="form-control mr-sm-2 cabecalho-procura" type="search" placeholder="Procurar" aria-label="Search"/>
                            <button className="btn btn-outline-secondary my-2 my-sm-0 cabecalho-procura-botao" type="submit">Procurar</button>
                        </form>
                    </div>
                </nav>
                <Rotas />
            </Router>
        );
    }
}