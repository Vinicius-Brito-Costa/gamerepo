import React from 'react';
import { connect } from 'react-redux';
import { MudarIdUsuario } from './../actions/usuario';

const funcoes = () => {
    return {
        MudarIdUsuario
    }
}

class PaginaLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            senha: ''
        }
        this.Logar = this.Logar.bind(this);
    }
    async Logar(event){
        event.preventDefault();
        const dado = {
            usuario: this.state.usuario,
            senha: this.state.senha
        }
        const cabecalho = {
            method: "POST",
            body: JSON.stringify(dado),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = 'http://localhost:777/login';
        let resultado = await fetch(url, cabecalho);
        let json = await resultado.json()
        console.log(json);
        if(json.logar){
            this.props.MudarIdUsuario(json.id)
            //window.Location.href = '/'
        }
    }
    render(){
        return(
            <main className="pagina-login-main pagina-login-background">
                <div className='pagina-login-formulario-fundo'>
                    
                    <form className='pagina-login-formulario' onSubmit={this.Logar}>
                    <h2 className='text-center'>Login</h2>
                        <label htmlFor='usuario'>Usuario:</label>
                        <input type='text' className='form-control pagina-login-input mb-2' name='usuario' id='usuario' onChange={(e) => this.setState({usuario: e.target.value})}/>
                        <label htmlFor='senha'>Senha:</label>
                        <input type='password' className='form-control pagina-login-input' name='senha' id='senha' onChange={(e) => this.setState({senha: e.target.value})}/>
                        <button type='submit' className='btn pagina-login-btn-entrar'>ENTRAR</button>
                        <div className='pagina-login-link-cadastro'><span>Ainda não possui um cadastro? </span><a href='/cadastro'>Clique aqui.</a></div>
                    </form>
                </div>
                <div className="pagina-login-fade"></div>
            </main>
        );
    }
}
export default connect(null, funcoes())(PaginaLogin);