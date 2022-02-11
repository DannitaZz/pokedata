import FixedBottomNavigation from "../components/bottombar"
import ResponsiveAppBar from "../components/navbar"
import  Pokedetails  from "../components/pokedetails"



function Details({searchValue, currentType, pokemon, dispatch}) {

    return (
        <>
        <ResponsiveAppBar searchValue={searchValue} currentType={currentType} dispatch={dispatch}/>
      <Pokedetails pokemon={pokemon} dispatch={dispatch}/>
      <FixedBottomNavigation dispatch={dispatch}/>
      </>
        )
}

export default Details