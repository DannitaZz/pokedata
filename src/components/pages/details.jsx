import FixedBottomNavigation from "../bottombar"
import ResponsiveAppBar from "../navbar"
import  Pokedetails  from "../pokedetails"



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