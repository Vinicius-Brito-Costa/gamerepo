export const reload = (state = 0, action) => {
    switch(action.type){
        
        case "LOADED":
            return state = false;
        default:
        case "LOAD":
            return state = true;
    }
}
