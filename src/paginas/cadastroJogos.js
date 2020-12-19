import React from 'react';

export default class PaginaInical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            att: 0
        }
        this.cadastro = this.cadastro.bind(this);
    }
    async cadastro(elemento){
        elemento.preventDefault();
        const url = "http://localhost/React/netflix/src/backend/PHP/cadastroJogos.php";
        const dado = new FormData(elemento.target);
        const cabecalho = {
            method: 'post',
            body: dado
        };
        await fetch(url, cabecalho);
        await alert('Ação Realizada.');
        await this.setState({att: this.state.att + 1});
    }
    render(){
        
        return(
            <main className="w-100 px-0 text-light paginas-cadastro-jogos">
                <div className="input-box mx-auto">
                    <h1 className="text-center">Adicionar Jogos</h1>
                    <form onSubmit={this.cadastro}>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-pre input-group-text">Jogo</span>
                            </div>
                            <input type="text" className="input input-texto form-control" placeholder="Nome do jogo" name='nome' />
                        </div>
                        <div className="input-textarea-titulo text-center">Descrição</div>
                        <textarea className="input input-textarea mb-2" placeholder="Descrição" name='descricao' />

                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-pre input-group-text">Faixa Etária</span>
                            </div>
                            <input type="number" className="input input-numero form-control" placeholder="Idade" name='idade' />
                        </div>
                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-pre input-group-text">Nome Imagem</span>
                            </div>
                            <input type="text" className="input input-texto form-control" placeholder="Nome da imagem" name='imagem' />
                        </div>
                        <button type="submit" className="btn input-btn mt-4">ADICIONAR</button>
                    </form>
                </div>
            </main>
        );
    }
}