import React from 'react';


export default class BoxFilme extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id_game: this.props.id,
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
        if(idade < 10){
            this.setState({faixa: 'L'});
            this.setState({idade: 'L'});
            this.setState({cor_faixa: 'faixa_livre px-3'});
        }
        else if(idade < 12 && idade >= 10){
            this.setState({faixa: '10'});
            this.setState({cor_faixa: 'faixa_10'});
        }
        else if(idade < 14 && idade >= 12){
            this.setState({faixa: '12'});
            this.setState({cor_faixa: 'faixa_12'});
        }
        else if(idade < 16 && idade >= 14){
            this.setState({faixa: '14'});
            this.setState({cor_faixa: 'faixa_14'});
        }
        else if(idade < 18 && idade >= 16){
            this.setState({faixa: '16'});
            this.setState({cor_faixa: 'faixa_16'});
        }
        else{
            this.setState({faixa: '18'});
            this.setState({cor_faixa: 'faixa_18'});
        }
    }
    render(){
        return(
            <div className="game-card border-0">
                    <img className="game-card-img" src={require(`./../imagens/${this.props.imagem}`).default} alt="" />
                    <div className="game-card-info">
                        <div className="game-card-info-conteudo">
                            <ul className="d-flex px-0 mx-0 game-card-categorias">
                                {this.state.categorias.map( (categoria, id) => 
                                    <li className="mx-2" key={id}><a href="#" className="text-light">{categoria}</a></li>
                                )}
                            </ul>
                            <h4 className="game-card-nome text-center font-weight-bold text-uppercase">{this.props.nome}</h4>
                            <div className={`game-card-faixa font-weight-bold btn ${this.state.cor_faixa}`}>{this.state.idade}</div>
                            <div className="game-card-lista font-weight-bold btn">{this.props.lista}X</div>
                            <a href="#" className="btn btn-success game-card-jogar w-25 font-weight-bold">JOGAR</a>
                        </div>
                    </div>
                </div>
        );
    }
}