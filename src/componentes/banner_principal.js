import React from 'react';
//https://dev.to/jam3/how-to-prevent-xss-attacks-when-using-dangerouslysetinnerhtml-in-react-1464
import dompurify from 'dompurify';

export default class Banner extends React.Component{
    render(){
        const sanitizador = dompurify.sanitize;
        return(
            <div className="container-fluid px-0 text-light">
                <div className=" banner-main-info">
                    <div className="banner-main-content">
                        <h1>{this.props.nome}</h1>
                        <div className="banner-main-text">
                            <div dangerouslySetInnerHTML={{__html: sanitizador(this.props.descricao)}}></div>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-lg px-4 mr-2 banner-botao-jogar">Jogar</button><button className="btn btn-lg px-4 banner-botao-info">Mais informações</button>
                        </div>
                    </div>
                </div>
                <div hidden>{this.props.descricao}</div>
                <img src={this.props.imagem_local ? require(`./../imagens/${this.props.imagem}`).default : this.props.imagem} className="banner-main-image" alt=""/>
                <div className="banner-main-fade"></div>
                
            </div>
        );
    }
}