import React from 'react';

export default class Banner extends React.Component{
    render(){
        return(
            <div className="container-fluid px-0 text-light">
                <div className=" banner-main-info">
                    <div className="banner-main-content">
                        <div className="banner-main-text">
                            {this.props.descricao}
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-lg btn-light text-dark px-4 mr-2 banner-botoes">Jogar</button><button className="btn btn-lg btn-secondary text-light px-4 banner-botoes">Mais informações</button>
                        </div>
                    </div>
                </div>
                <div hidden>{this.props.descricao}</div>
                <img src={require(`./../imagens/${this.props.imagem}`).default} className="banner-principal" alt=""/>
                <div className="banner-main-fade"></div>
                
            </div>
        );
    }
}