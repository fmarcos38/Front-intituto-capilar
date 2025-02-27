
const initialState = {
    loading: true,
};


export default function rootReducer (state = initialState, action) {
    switch(action.type){
        /* case LOADING:
        return{
            ...state,
            loading: false
        }; */
        
        default:
            return state;
    }
};