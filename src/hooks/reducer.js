import {getLocalStorageObj} from '../utils'

const [favs,] = getLocalStorageObj('favs',[])
const [favIds,] = getLocalStorageObj('favIds',[])
const login = localStorage.getItem('login')

export const initialState = {
    data: [],
    favs: favs,
    favIds: favIds,
    login: login,
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
            return {...state, filterState: {...state.filterState, name: action.value}, mainPage: {...state.mainPage, page: 1}, favPage: {...state.favPage, page: 1}}
        case 'filterType':
            let newType = action.value
            if (newType === state.filterState.type){
                newType = 'all'
            } else if(types_list.includes(newType)){
            } else {
                newType = 'all'
            }
            return {...state, filterState: {...state.filterState, type: newType}, mainPage: {...state.mainPage, page: 1}, favPage: {...state.favPage, page: 1}}
        case 'login':
            localStorage.setItem('login', 'true')
            return {...state, login:'true'}
        case 'logout':
                localStorage.removeItem('login')
                return {...state, login:false}
        default:
           return {...state}
    }
}
