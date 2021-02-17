import React from 'react';

export default class Banner extends React.Component{
    render(){
        return(
            <div className="container-fluid px-0 text-light">
                <div className=" pagina-jogo-main-info">
                    <div className="pagina-jogo-titulo">
                        <h1>{this.props.dev.name}</h1>
                    </div>
                </div>
                <img src={this.props.dev.image_background} className="pagina-jogo-main-image" alt=""/>
                <img src={this.props.dev.image} className="pagina-jogo-main-avatar" alt=""/>
                <div className="pagina-jogo-main-fade"></div>
                
            </div>
        );
    }
}