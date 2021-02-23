import React from 'react';
import CardJogo from './card_jogo'
import { connect } from 'react-redux';

const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario
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
                    
                    <div className="box-game-card mt-2" key={index}><CardJogo jogo={jogo} id_usuario={this.props.id_usuario}/></div>
                )}
            </main>
        );
    }
}
export default connect(estados)(Resultados);