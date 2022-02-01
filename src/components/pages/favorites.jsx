import ResponsiveAppBar from "../navbar"
import Pokelist from "../pokelist"

const filterFav = (e) => {
    if (!e===false){
        return true
    } else{
        return false
    }
}

function Favorites({state, dispatch}) {
    const cleanFavs = state.favs.filter(filterFav);
    console.log(cleanFavs)
    return (
        <>
        <ResponsiveAppBar />
        <h3>Pokémon favs</h3>
        <Pokelist state={state} data={cleanFavs} dispatch={dispatch}/>
        
        </>
    )
}
export default Favorites