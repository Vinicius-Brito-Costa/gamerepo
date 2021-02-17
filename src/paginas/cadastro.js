import React from 'react';

class PaginaLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            usuario: '',
            senha: '',
            senha2: '',
            senhaValida: false
        }
        this.validarSenha = this.validarSenha.bind(this);
        this.Cadastrar = this.Cadastrar.bind(this);
    }
    validarSenha(){
        if(this.state.senha2 === this.state.senha)
        {
            this.setState({senhaValida: true});
        }
    }
    async Cadastrar(event){ 
        event.preventDefault();
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
        let url = 'http://localhost:777/cadastro';
        let resultado = await fetch(url, cabecalho);
        let json = await resultado.json()
        console.log(json)
    }
    render(){
        return(
            <main className="pagina-cadastro-main pagina-cadastro-background">
                <div className='pagina-cadastro-formulario-fundo'>
                    
                    <form className='pagina-cadastro-formulario' onSubmit={this.Cadastrar}>
                    <h2 className='text-center'>Cadastre-se</h2>
                        <label htmlFor='usuario'>Usuario:</label>
                        <input type='text' className='form-control pagina-cadastro-input mb-2' name='usuario' id='usuario' onChange={(e) => this.setState({usuario: e.target.value})} />
                        <label htmlFor='email'>E-mail:</label>
                        <input type='email' className='form-control pagina-cadastro-input mb-2' name='email' id='email' onChange={(e) => this.setState({email: e.target.value})} />
                        <label htmlFor='senha'>Senha:</label>
                        <input type='password' className='form-control pagina-cadastro-input' name='senha' id='senha' onChange={(e) => this.setState({senha: e.target.value})} />
                        <label htmlFor='senha2'>Confirme a senha:</label>
                        <input type='password' className='form-control pagina-cadastro-input' name='senha2' id='senha2' onChange={(e) => this.setState({senha2: e.target.value} )}/>
                        <button type='submit' className='btn pagina-cadastro-btn-cadastrar'>CADASTRAR</button>
                    </form>
                </div>
                <div className="pagina-cadastro-fade"></div>
            </main>
        );
    }
}
export default PaginaLogin;