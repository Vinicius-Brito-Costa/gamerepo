import React from 'react';
import { connect } from 'react-redux';
import { SelecionarJogo } from './../actions/usuario';
import { pesquisa } from './../actions/pesquisa';
import { Load } from './../actions/paginaPrincipal';
import { Link } from 'react-router-dom';

const mapDispatchToProps = () => {
    return{
        SelecionarJogo,
        Load,
        pesquisa
    }
}
const estados = (state) => {
    return{
        jogosDoUsuario: state.listJogosUsuario
    }
}
class BoxJogo extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }

    render(){
        console.log(this.props.dev)
        return(
            <div className={`dev-card border-0 dev-card-link mx-auto`}>
                    <img className="dev-card-img" src={this.props.dev.image ? this.props.dev.image : this.props.dev.image_background} alt="" />
                    <div className="dev-card-info">
                        
                        <div className="dev-card-info-conteudo mx-auto">
                            <ul className="d-flex px-0 dev-card-categorias">
                                {this.props.dev.positions.map( (posicao, id) => 
                                    <li className="mx-2" key={id}><a href="/categoria" className="text-light">{posicao.name}</a></li>
                                )}
                            </ul>
                            <h4 className="dev-card-nome text-center font-weight-bold text-uppercase">{this.props.dev.name}</h4>
                            <Link as={Link} to='/pesquisa' onClick={() => this.props.pesquisa('&creators=' + this.props.dev.id)} className="btn border-success dev-card-jogo font-weight-bold"><span>JOGOS</span></Link>
                        </div>
                    </div>
                </div>
        );
    }
}
export default  connect(estados, mapDispatchToProps())(BoxJogo);