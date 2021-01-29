import React from 'react';


export default class BoxJogo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id_jogo: this.props.id,
            descricao: this.props.descricao,
            categorias:this.props.categorias,
            idade: this.props.idade,
            faixa: 'L',
            cor_faixa: 'faixa_livre'
        }
    }
    componentDidMount(){
        this.faixaEtariaCheck();
    }
    faixaEtariaCheck(){
        let idade = this.state.idade;
        if(idade === 'Everyone 10+'){
            this.setState({faixa: '12'});
            this.setState({cor_faixa: 'faixa_12'});
        }
        else if(idade === 'Teen'){
            this.setState({faixa: '14'});
            this.setState({cor_faixa: 'faixa_14'});
        }
        else if(idade === 'Mature'){
            this.setState({faixa: '16'});
            this.setState({cor_faixa: 'faixa_16'});
        }
        else if( idade === 'Adults Only'){
            this.setState({faixa: '18'});
            this.setState({cor_faixa: 'faixa_18'});
        }
        else if( idade === 'none'){
            this.setState({faixa: 'N'});
            this.setState({cor_faixa: 'faixa_none'});
        }
        else{
            this.setState({faixa: 'L'});
            this.setState({idade: 'L'});
            this.setState({cor_faixa: 'faixa_livre px-3'});
        }
    }
    render(){
        return(
            <div className={`game-card border-0 game-card-link mx-auto`}>
                    <img className="game-card-img" src={/*require(`./../imagens/${this.props.imagem}`).default*/ this.props.imagem} alt="" />
                    <div className="game-card-info">
                        <div className="game-card-info-conteudo">
                            <ul className="d-flex px-0 mx-0 game-card-categorias">
                                {this.state.categorias.map( (categoria, id) => 
                                    <li className="mx-2" key={id}><a href="/categoria" className="text-light">{categoria['name']}</a></li>
                                )}
                            </ul>
                            <h4 className="game-card-nome text-center font-weight-bold text-uppercase">{this.props.nome}</h4>
                            <div className={`game-card-faixa font-weight-bold btn ${this.state.cor_faixa}`}><span>{this.state.faixa}</span></div>
                            <div className="game-card-lista font-weight-bold btn"><span>{this.props.lista}X</span></div>
                            <a href="/jogar" className="btn btn-success game-card-jogar w-25 font-weight-bold"><span>JOGAR</span></a>
                        </div>
                    </div>
                </div>
        );
    }
}