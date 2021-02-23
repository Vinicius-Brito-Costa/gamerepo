let recarregar = true;
export const reload = (state = recarregar, action) => {
    switch(action.type){
        default:
            return recarregar;
        case "LOADED":
            recarregar = false;
            return recarregar;
        case "LOAD":
            recarregar = true;
            return recarregar;
    }
}
