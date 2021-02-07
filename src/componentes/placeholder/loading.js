function Loading(){
    return(
        <div className='mx-auto main-body'>
            <div className='container text-center mt-4'>
                <img src={require('./../../imagens/waiting-slow.gif').default} />
                <h2 className='text-light'>Loading....</h2>    
            </div>
        </div>
    )
}

export default Loading;