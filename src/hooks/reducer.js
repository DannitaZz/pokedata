import {getLocalStorageObj} from '../utils'

const [favs,] = getLocalStorageObj('favs',[])
const [favIds,] = getLocalStorageObj('favIds',[])

export const initialState = {
    data: [],
    favs: favs,
    favIds: favIds,
    mainPage: {
        currentData:[],
        page: 1,
    },
    favPage: {
        currentData:[],
        page: 1,
    },
    detailPage: {
        pokemon: {
            name: 'loading',
            types: [{type: {name: 'loading', url: 'url'}}],
            stats: [{'base_stat': '50', stat: {name: 'loading', url: 'url'}}, {'base_stat': '50', stat: {name: 'loading', url: 'url'}}, {'base_stat': '50', stat: {name: 'loading', url: 'url'}}, {'base_stat': '50', stat: {name: 'loading', url: 'url'}}, {'base_stat': '50', stat: {name: 'loading', url: 'url'}}, {'base_stat': '50', stat: {name: 'loading', url: 'url'}}],
            sprites: {other:{'official-artwork': { front_default: 'loading'}}}
        },
    },
    filterState: {
        name: '',
        type: 'all',
    }
}

const types_list =  ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];

function arrayRemove(arr, value) { 
    
    return arr.filter(function(e){ 
        return e !== value; 
    });
}

// const pageSize = 20;
export const reducer = (state, action) => {
    switch (action.type) {
        case 'getData':
            const data = action.data;
            return {...state, data: data}
        case 'setMainPage':
            return {...state, mainPage: {...state.mainPage, page: action.page}}  
        case 'setFavPage':
            return {...state, favPage: {...state.favPage, page: action.page}} 
        case 'getPokemon':
            const pokemon = action.pokemon;
            console.log('El pokemon es: ',  pokemon.name)
            return {...state, detailPage: {pokemon: pokemon}}    
        case 'setFav':
            const id = action.value;
            const index = id - 1;
            let currentFavIds = JSON.parse(JSON.stringify(state.favIds));
            const currentPokeEntry =  JSON.parse(JSON.stringify(state.data));
            if (currentFavIds.includes(id)) {
                currentFavIds = arrayRemove(currentFavIds, id);
            } else {
                currentFavIds.push(id);
            }
            let newFavs = [];
            currentPokeEntry.forEach(element => {
                if (currentFavIds.includes(element.id)) {
                    newFavs.push(element);
                }
            });
            localStorage.setItem('favs', JSON.stringify(newFavs));
            localStorage.setItem('favIds', JSON.stringify(currentFavIds));
            return {...state, favs: newFavs, favIds: currentFavIds}
        case 'filterName':
            return {...state, filterState: {...state.filterState, name: action.value}}
        case 'filterType':
            let newType = action.value
            // console.log(newType)
            if (newType === state.filterState.type){
                newType = 'all'
            } else if(types_list.includes(newType)){
                console.log(newType)
            } else {
                newType = 'all'
            }
            return {...state, filterState: {...state.filterState, type: newType}}
            // case 'gen':
        //     return {...state, filterState: {gen: action.value}}              
            // const generation = action.generation;
            // console.log('Generación: ', generation)
            // const filterData = data.filter((pokemon)=> pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_generation.name === generation);
            // return {...state, mainPage: {currentData: filterData}}
        default:
           return {...state}
    }
}

// const pageSize = 20;
// export const reducer = (state, action) => {
//     switch (action.type) {
//         case 'getData':
//             const data = action.data;
//             const dummyFavs = Array(data.length).fill(false);
//             return {...state, data: data, currentData: data.slice(0, 20), favs: dummyFavs}
//         case 'setPage':
//             const page = action.page;
//             const currentIndex =  (page*pageSize)-20;
//             const pokeData = JSON.parse(JSON.stringify(state.data));
//             const currentData = pokeData.slice(currentIndex, currentIndex + 20);
//             return {...state, page: page, currentData: currentData}  
//         case 'favs':
//             const id = action.value;
//             const index = id - 1
//             const currentFavs = JSON.parse(JSON.stringify(state.favs));
//             const currentPokeEntry =  JSON.parse(JSON.stringify(state.data[index]));
//             currentFavs[index] = currentPokeEntry;
//             console.log(currentFavs.filter(filterFav))
//             return {...state, favs: currentFavs}
//             // const id = action.value;
//             // let currentFavs = JSON.parse(JSON.stringify(state.favs));
//             // const currentPokefavs = JSON.parse(JSON.stringify(state.pokeFavs));

//             // if (currentFavs.includes(id)) {
//             //     currentFavs = arrayRemove(currentFavs, id);
//             // } else {
//             //     currentFavs.push(id);
//             // }
//             // let newPokefavs= [];
//             // currentPokefavs.forEach(element => {
//             //     if (currentFavs.includes(element.id)) {
//             //         newPokefavs.push(element);
//             //     }
//             // });
//             // console.log('favs', currentFavs)
//             // console.log('pokefavs', newPokefavs)
//             // return {...state, favs: currentFavs, pokeFavs: newPokefavs}
//         default:
//            return {...state}
//     }
// }