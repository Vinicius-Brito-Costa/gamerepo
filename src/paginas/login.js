import React from 'react';
import { caracteresMinimos } from './../javascript/validacao';

class PaginaLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            senha: ''
        }
        this.Logar = this.Logar.bind(this);
        this.verificarClasse = this.verificarClasse.bind(this);
    }
    async Logar(event){
        event.preventDefault();
        let minimo = 6;

        if(!caracteresMinimos(minimo, this.state.senha)){
            document.getElementById('senha').classList.add('pagina-login-input-errado');
            alert('A senha contém no minimo 6 caracteres.')
            return
        }

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
        let url = '/login';
        let resultado = await fetch(url, cabecalho);
        if(!resultado.usuario && !resultado.senha){
            document.cookie = "token=" + resultado
            window.location.href = '/'
        }
        else if(!resultado.usuario){
            document.getElementById('usuario').classList.add('pagina-login-input-errado');
            alert('Usuario inválido.')
        }
        else if(!resultado.senha){
            document.getElementById('senha').classList.add('pagina-login-input-errado');
            alert('Senha inválida.')
        }
        
    }
    verificarClasse(e){
        if(e.target.classList.contains('pagina-login-input-errado')){
            e.target.classList.remove('pagina-login-input-errado')
        }
    }
    render(){
        return(
            <main className="pagina-login-main pagina-login-background">
                <div className='pagina-login-formulario-fundo'>
                    
                    <form className='pagina-login-formulario' id='pagina-login-form' onSubmit={this.Logar}>
                    <h2 className='text-center'>Login</h2>
                        <label htmlFor='usuario'>Usuario:</label>
                        <input type='text' className='form-control pagina-login-input mb-2' name='usuario' id='usuario' onClick={(e) => this.verificarClasse(e)} onChange={(e) => this.setState({usuario: e.target.value})} required/>
                        <label htmlFor='senha'>Senha:</label>
                        <input type='password' className='form-control pagina-login-input' name='senha' id='senha' onClick={(e) => this.verificarClasse(e)} onChange={(e) => this.setState({senha: e.target.value})} required/>
                        <button type='submit' className='btn pagina-login-btn-entrar'>ENTRAR</button>
                        <div className='pagina-login-link-cadastro text-center'><span>Ainda não possui um cadastro? </span><a href='/cadastro'>Clique&nbsp;aqui.</a></div>
                    </form>
                </div>
                <div className="pagina-login-fade"></div>
            </main>
        );
    }
}
export default PaginaLogin;