export const initialState = {
    data: [],
    currentData: [],
    page: 1,
    favs:[],
    // pokeFavs: [],
}

const filterFav = (e) => {
    if (!e===false){
        return true
    } else{
        return false
    }
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(e){ 
        return e !== value; 
    });
}

/* function get_cached_item(key){
    let item = []
    try{
        item = JSON.parse(localStorage.getItem(key))
    }catch(error){
        item = JSON.parse(localStorage.removeItem(key))
        item = []
    }
    return item
}
 */
const pageSize = 20;
export const reducer = (state, action) => {
    switch (action.type) {
        case 'getData':
            const data = action.data;
            const dummyFavs = Array(data.length).fill(false);
            return {...state, data: data, currentData: data.slice(0, 20), favs: dummyFavs}
        case 'setPage':
            const page = action.page;
            const currentIndex =  (page*pageSize)-20;
            const pokeData = JSON.parse(JSON.stringify(state.data));
            const currentData = pokeData.slice(currentIndex, currentIndex + 20);
            return {...state, page: page, currentData: currentData}  
        case 'favs':
            const id = action.value;
            const index = id - 1
            const currentFavs = JSON.parse(JSON.stringify(state.favs));
            const currentPokeEntry =  JSON.parse(JSON.stringify(state.data[index]));
            currentFavs[index] = currentPokeEntry;
            console.log(currentFavs.filter(filterFav))
            return {...state, favs: currentFavs}
            // const id = action.value;
            // let currentFavs = JSON.parse(JSON.stringify(state.favs));
            // const currentPokefavs = JSON.parse(JSON.stringify(state.pokeFavs));

            // if (currentFavs.includes(id)) {
            //     currentFavs = arrayRemove(currentFavs, id);
            // } else {
            //     currentFavs.push(id);
            // }
            // let newPokefavs= [];
            // currentPokefavs.forEach(element => {
            //     if (currentFavs.includes(element.id)) {
            //         newPokefavs.push(element);
            //     }
            // });
            // console.log('favs', currentFavs)
            // console.log('pokefavs', newPokefavs)
            // return {...state, favs: currentFavs, pokeFavs: newPokefavs}
        default:
           return {...state}
    }
}