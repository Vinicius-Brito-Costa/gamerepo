import React from 'react';

export default class Rodape extends React.Component{
    render(){
        return(
            <>
                <div className="rodape text-secondary pb-4 text-center">
                    <a href="https://github.com/Vinicius-Brito-Costa" target="_blank" rel="noreferrer"><img className="rodape-midia-social" src={require('./../imagens/github.svg').default} alt="" /></a>
                    <a href="https://www.linkedin.com/in/vin%C3%ADcius-brito-costa-150b9b158/" target="_blank" rel="noreferrer"><img className="rodape-midia-social ml-4" src={require('./../imagens/linkedin.svg').default} alt="" /></a>

                    <div className="mx-auto">
                        <span className="d-block">Criado por: Vinicius Brito Costa</span>
                        <span className="d-block">Ícones feitos por <a className="text-secondary" href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a className="text-secondary" href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></span>
                        <span className="d-block">&copy; 2020 - 2021</span>
                    </div>
                </div>
            </>
        );
    }
}