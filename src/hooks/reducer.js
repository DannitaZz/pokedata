export const initialState = {
    data: [],
    currentData: [],
    page: 1,
}

const pageSize = 20;
export const reducer = (state, action) => {
    switch (action.type) {
        case 'getData':
            const data = action.data;
            return {...state, data: data, currentData: data.slice(0, 20)}
        case 'setPage':
            const page = action.page;
            const currentIndex =  (page*pageSize)-20;
            const pokeData = JSON.parse(JSON.stringify(state.data));
            const currentData = pokeData.slice(currentIndex, currentIndex + 20);
            return {...state, page: page, currentData: currentData}  
    
        default:
           return {...state}
    }
}