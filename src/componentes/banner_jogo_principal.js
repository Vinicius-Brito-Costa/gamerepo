import React from 'react';
export default class Banner extends React.Component{
    render(){
        return(
            <div className="container-fluid px-0 text-light">
                <div className=" pagina-jogo-main-info">
                    <div className="pagina-jogo-titulo">
                        <h1>{this.props.jogo.name}</h1>
                    </div>
                </div>
                {this.props.jogo !== null && this.props.jogo.stores ? 
                    <div className='pagina-jogo-lojas'>
                        <h2>Lojas</h2>
                        {this.props.jogo.stores != null ? 
                            <div className='pagina-jogo-lojas-box'>
                            {this.props.jogo.stores.map((loja, index) => {
                                return <a className='pagina-jogo-loja-link' href={loja.url} target="_blank" rel="noreferrer" key={index}>{loja.store.name}</a>
                            })}
                        </div>
                        : ''}
                    </div>
                : ''}
                {this.props.jogo.metacritic !== null || this.props.jogo.rating  > 0 ? 
                    <div className='pagina-jogo-notas'>
                    <h3>NOTAS</h3>
                    {this.props.jogo.metacritic !== null ? 
                        <div className="pagina-jogo-notas-box">
                            <h5>Metacritic</h5>
                            <div className='btn border-warning font-weight-bold'>
                                {this.props.jogo.metacritic}
                            </div>
                        </div>
                    : ''}
                    
                    <div className="pagina-jogo-notas-box">
                        <h5>Jogadores</h5>
                        <div className='btn border-primary font-weight-bold'>
                            {Math.round(this.props.jogo.rating)}/5
                        </div>
                    </div>
                </div>
                : ''}
                <img src={this.props.jogo.background_image} className="pagina-jogo-main-image" alt=""/>
                <div className="pagina-jogo-main-fade"></div>
                
            </div>
        );
    }
}