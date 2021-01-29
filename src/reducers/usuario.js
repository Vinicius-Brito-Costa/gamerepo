export const usuario = (state = 0, action) =>{
    state = action.payload ? action.payload : 1;
    return state;
}
export default usuario;