function SemJogo(){
    return(
        <div className='pagina-sem-jogo'>
            <div className='container text-center'>
                <div className='pagina-sem-jogo-fade'></div>
                <div className='pagina-sem-jogo-over'></div>
                <img src={require('./../../imagens/streets.gif').default} />
            </div>
            <div className='pagina-sem-jogo-texto'>
                <h2 className='text-light'>Parece que você ainda não adicionou nenhum jogo a sua lista.</h2>
                <h3 className='text-light'>Veja os mais novos jogos</h3> 
            </div>   
        </div>
    )
}

export default SemJogo;