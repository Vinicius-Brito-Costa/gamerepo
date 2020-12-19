import React from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


import Cabecalho from './componentes/cabecalho';
import Rodape from './componentes/rodape';

export default class Aplicativo extends React.Component{
    render(){
        return(
            <div>
                <Cabecalho/>
                <Rodape />
            </div>
        );
    }
}