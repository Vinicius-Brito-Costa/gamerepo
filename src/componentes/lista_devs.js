import React from 'react';
import CardDev from './card_dev';

class Resultados extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            devs: this.props.devs
        }
    }
    render(){
        return(
            <div>
                <h2>Desenvolvedores: </h2>
                <div className="lista-de-dev-main row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 py-4 gx-0">
                    {this.props.devs.map((dev, index) => 
                        <div className="lista-de-jogos-dev-box mt-2" key={index}><CardDev dev={dev} /></div>
                    )}
                </div>
            </div>
        );
    }
}
export default Resultados;