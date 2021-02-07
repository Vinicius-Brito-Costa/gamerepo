let recarregar = true;
export const reload = (state = recarregar, action) => {
    switch(action.type){
        default:
            console.log('Default')
            return recarregar;
        case "LOADED":
            console.log('Loaded')
            recarregar = false;
            return recarregar;
        case "LOAD":
            console.log('Load')
            recarregar = true;
            return recarregar;
    }
}
