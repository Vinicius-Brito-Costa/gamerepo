function Loading(){
    return(
        <div className='mx-auto main-body-loading'>
            <div className='container text-center mt-4'>
                <img src={require('./../../imagens/waiting-slow.gif').default} alt='' />
                <h2 className='text-light'>Loading....</h2>    
            </div>
        </div>
    )
}

export default Loading;