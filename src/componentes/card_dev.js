import React from 'react';
import { connect } from 'react-redux';
import { SelecionarDev } from './../actions/usuario';
import { pesquisa } from './../actions/pesquisa';
import { Load } from './../actions/paginaPrincipal';
import { Link } from 'react-router-dom';

const mapDispatchToProps = () => {
    return{
        SelecionarDev,
        Load,
        pesquisa
    }
}
class BoxJogo extends React.Component{

    render(){
        return(
            <div className={`dev-card border-0 dev-card-link mx-auto`}>
                    <img className="dev-card-img" src={this.props.dev.image ? this.props.dev.image : this.props.dev.image_background} alt="" />
                    <div className="dev-card-info">
                        
                        <div className="dev-card-info-conteudo mx-auto">
                            <ul className="px-0 dev-card-categorias">
                                {this.props.dev.positions.map( (posicao, id) => {
                                    if(id < 3){
                                        return <li className="mx-2" key={id}><a href="/categoria" className="text-light">{posicao.name}</a></li>
                                    }
                                    return ''
                                }
                                )}
                            </ul>
                            <h4 className="dev-card-nome text-center font-weight-bold text-uppercase">{this.props.dev.name}</h4>
                            
                            <Link as={Link} to='/dev' onClick={() => {
                                this.props.pesquisa('&creators=' + this.props.dev.id)
                                this.props.SelecionarDev(this.props.dev.id)
                            }} className="btn dev-card-jogo font-weight-bold"><span>MAIS</span></Link>
                        </div>
                    </div>
                </div>
        );
    }
}
export default  connect(null, mapDispatchToProps())(BoxJogo);