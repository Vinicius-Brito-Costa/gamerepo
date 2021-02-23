import {Component } from 'react';
import ListaImagens from './../componentes/imagensLandingPage';

class LandingPage extends Component{
    render(){
        return(
            <>
                <img className='landing-page-main-img' src={ListaImagens()} alt=''/>
                <div className='landing-page-main-fade'></div>
                <div className='landing-page-main-fade2'></div>
                <main className='landing-page-main'>
                    <div className='landing-page-text-box'>
                        <h1 className='landing-page-headline'>Descubra mais de 500.000 jogos.</h1>
                        <div className="d-block"><a href='/cadastro' className='landing-page-sub'><span>Cadastre-se!</span></a></div>
                    </div>
                </main>
            </>
        )
    }
}

export default LandingPage;