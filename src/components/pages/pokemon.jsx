import ResponsiveAppBar from "../navbar"
import PaginationControlled from "../pagination"
import Pokelist from "../pokelist"

function Pokemon({state, dispatch}) {
    return (
        <>
        <ResponsiveAppBar/>
      <PaginationControlled state={state} dispatch={dispatch} />
      <Pokelist state={state} dispatch={dispatch}/>
      <PaginationControlled state={state} dispatch={dispatch} />
      </>
        )
}

export default Pokemon