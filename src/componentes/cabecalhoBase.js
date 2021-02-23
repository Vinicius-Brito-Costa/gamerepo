let token = 'none'
if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
    token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
}
else if(document.cookie.split('token=')){
    token = document.cookie.split('token=')[1];
}
function cabecalhoBase(){
    const cabecalho = {
        method: "POST",
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        }
    };
    return cabecalho
}

export default cabecalhoBase;