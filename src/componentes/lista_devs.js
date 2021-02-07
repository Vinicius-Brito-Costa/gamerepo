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
            <main className="lista-de-jogos-main w-100 row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 mx-auto px-0 py-4">
                {this.props.devs.map((dev, index) => 
                    <div className="w-100 mt-2" key={index}><CardDev dev={dev} /></div>
                )}
            </main>
        );
    }
}
export default Resultados;