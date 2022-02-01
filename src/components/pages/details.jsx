import  Pokedetails  from "../pokedetails"



function Details({pokemon, dispatch}) {

    return (
        <>
       <h1>Vista detalles</h1>
      <Pokedetails pokemon={pokemon} dispatch={dispatch}/>
      </>
        )
}

export default Details