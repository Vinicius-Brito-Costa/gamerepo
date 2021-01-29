import React from 'react';
import CardJogo from './card_jogo'
import { connect } from 'react-redux';

const estados = (store) => {
    return {

    }
}

class Resultados extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jogos: this.props.jogos
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.jogos !== prevProps.jogos){
            this.setState({jogos: this.props.jogos})
        } 
    }
    render(){
        return(
            <main className="lista-de-jogos-main w-100 row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 mx-auto px-0 py-4">
                {this.state.jogos.map((jogo, index) => 
                    
                    <div className="w-100" key={index}><CardJogo id={jogo.id} nome={jogo.name} categorias={jogo.genres} idade={jogo.esrb_rating != null ? jogo.esrb_rating.name : "none"} imagem={jogo.background_image} descricao={jogo.description}  /></div>
                )}
            </main>
        );
    }
}
export default connect(estados)(Resultados);