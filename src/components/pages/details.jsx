import ResponsiveAppBar from "../navbar"
import  Pokedetails  from "../pokedetails"



function Details({currentType, pokemon, dispatch}) {

    return (
        <>
        <ResponsiveAppBar currentType={currentType} dispatch={dispatch}/>
       <h1>Vista detalles</h1>
      <Pokedetails pokemon={pokemon} dispatch={dispatch}/>
      </>
        )
}

export default Details