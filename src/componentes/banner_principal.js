import React from 'react';
//https://dev.to/jam3/how-to-prevent-xss-attacks-when-using-dangerouslysetinnerhtml-in-react-1464
import dompurify from 'dompurify';
import { connect } from 'react-redux';
import { SelecionarJogo } from './../actions/usuario';
import { Link } from 'react-router-dom';

const mapDispatchToProps = () => {
    return{
        SelecionarJogo
    }
}

class Banner extends React.Component{
    render(){
        const sanitizador = dompurify.sanitize;
        return( this.props.jogo ?
            <div className="container-fluid px-0 text-light">
                <div className=" banner-main-info">
                    <div className="banner-main-content">
                        <h1>{this.props.jogo.name}</h1>
                        <div className="banner-main-text">
                            <div dangerouslySetInnerHTML={{__html: sanitizador(this.props.jogo.description)}}></div>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-lg px-4 mr-2 banner-botao-jogar">Jogar</button><Link to='/jogo' as={Link} onClick={() => this.props.SelecionarJogo(this.props.jogo)} className="btn btn-lg px-4 banner-botao-info">Mais informações</Link>
                        </div>
                    </div>
                </div>
                <img src={this.props.jogo.background_image} className="banner-main-image" alt=""/>
                <div className="banner-main-fade"></div>
                
            </div>
        : <h1>Sem Jogo</h1>);
    }
}
export default  connect(null, mapDispatchToProps())(Banner);