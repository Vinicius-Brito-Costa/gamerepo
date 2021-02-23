import React from 'react';
import { caracteresMinimos } from './../javascript/validacao';
class PaginaLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            usuario: '',
            senha: '',
            senha2: '',
            usuarioValido: false,
            senhaValida: false
        }
        this.validarSenha = this.validarSenha.bind(this);
        this.Cadastrar = this.Cadastrar.bind(this);
        this.verificarClasse = this.verificarClasse.bind(this);
    }
    validarUsuario(){
        if(caracteresMinimos(6, this.state.usuario)){
            this.setState({usuarioValido: true})
        }
        else{
            document.getElementById('usuario').classList.add('pagina-login-input-errado');
            alert('O nome do usuario deve conter no minimo 6 caracteres.')
        }
    }
    validarSenha(){
        if(this.state.senha2 === this.state.senha){
            if(caracteresMinimos(6, this.state.senha))
            {
                this.setState({senhaValida: true});
            }
            else{
                document.getElementById('senha2').classList.add('pagina-login-input-errado');
                alert('A senha deve contér no minimo 6 caracteres.')
            }
            
        }
        else{
            document.getElementById('senha2').classList.add('pagina-login-input-errado');
            alert('Senhas não identicas.')
        }
    }
    verificarClasse(e){
        if(e.target.classList.contains('pagina-login-input-errado')){
            e.target.classList.remove('pagina-login-input-errado')
        }
    }
    async Cadastrar(event){ 
        event.preventDefault();
        this.validarSenha();
        this.validarUsuario();
        if(this.state.senhaValida && this.state.usuarioValido){
            const dado = {
                usuario: this.state.usuario,
                senha: this.state.senha,
                email: this.state.email
            }
            const cabecalho = {
                method: "POST",
                body: JSON.stringify(dado),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let url = 'https://rest-api-gameflix.herokuapp.com/cadastro';
            let resultado = await fetch(url, cabecalho);
            let json = await resultado.json()
            if(!json.usuario){
                document.getElementById('usuario').classList.add('pagina-login-input-errado');
                alert('Nome de usuario já está em uso.')
            }
            else if(!json.email){
                document.getElementById('email').classList.add('pagina-login-input-errado');
                alert('E-mail já está em uso.')
            }
            else{
                window.location.href = '/login'
            }
        }
        else{
            return;
        }
    }
    render(){
        return(
            <main className="pagina-cadastro-main pagina-cadastro-background">
                <div className='pagina-cadastro-formulario-fundo'>
                    
                    <form className='pagina-cadastro-formulario' onSubmit={this.Cadastrar}>
                    <h2 className='text-center'>Cadastre-se</h2>
                        <label htmlFor='usuario'>Usuario:</label>
                        <input type='text' className='form-control pagina-cadastro-input mb-2' name='usuario' id='usuario' onClick={(e) => this.verificarClasse(e)} onChange={(e) => this.setState({usuario: e.target.value})} />
                        <label htmlFor='email'>E-mail:</label>
                        <input type='email' className='form-control pagina-cadastro-input mb-2' name='email' id='email' onClick={(e) => this.verificarClasse(e)} onChange={(e) => this.setState({email: e.target.value})} />
                        <label htmlFor='senha'>Senha:</label>
                        <input type='password' className='form-control pagina-cadastro-input' name='senha' id='senha' onChange={(e) => this.setState({senha: e.target.value})} />
                        <label htmlFor='senha2'>Confirme a senha:</label>
                        <input type='password' className='form-control pagina-cadastro-input' name='senha2' id='senha2' onClick={(e) => this.verificarClasse(e)} onChange={(e) => this.setState({senha2: e.target.value} )}/>
                        <button type='submit' className='btn pagina-cadastro-btn-cadastrar'>CADASTRAR</button>
                        <div className='pagina-login-link-cadastro text-center pt-2'><span>Já possui um cadastro? </span><a href='/login'>Clique&nbsp;aqui.</a></div>
                    </form>
                </div>
                <div className="pagina-cadastro-fade"></div>
            </main>
        );
    }
}
export default PaginaLogin;